import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Chess } from "chess.js";
import { notifyFriendsOfMove, sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { from, to, promotion } = await req.json();

  try {
    // Get the active game and moves
    const game = await prisma.game.findFirst({
      where: { active: true },
      include: { moves: true },
    });
    if (!game) {
      return NextResponse.json({ error: "No active game" }, { status: 404 });
    }

    const { moves } = game;
    const sortedMoves = moves.sort((a, b) => a.moveNumber - b.moveNumber);

    // Set up the chess board with current game state
    const chess = new Chess();
    sortedMoves.forEach((m) => chess.move({ from: m.from, to: m.to }));

    // Check if it's the internet's turn
    const isInternetTurn =
      (sortedMoves.length % 2 === 0 && chess.turn() === "w") ||
      (sortedMoves.length % 2 === 1 && chess.turn() === "b");
    if (!isInternetTurn) {
      return NextResponse.json({ error: "Not your turn" }, { status: 403 });
    }

    // Attempt the new move and validate
    const attemptedMove = chess.move({ from, to, promotion });
    if (!attemptedMove) {
      return NextResponse.json({ error: "Invalid move" }, { status: 400 });
    }

    // Save the move to the database
    await prisma.move.create({
      data: {
        from,
        to,
        promotion,
        moveNumber: moves.length + 1,
        gameId: game.id,
      },
    });
    // Determine if the last move was made by the opponent
    const lastMoveColor = sortedMoves.length % 2 === 0 ? "w" : "b";
    if (lastMoveColor !== game.playerColor) {
      sendEmail({
        to: "mitchellkellywalters@gmail.com",
        subject: "Your move",
        text: "It's your turn to make a move in the chess game. https://mitchellwalters.com/interests/chess",
        html: "<strong>It's your turn to make a move in the chess game.</strong>",
      });
    } else {
      notifyFriendsOfMove();
    }

    // Check if the game is over
    const isGameOver = chess.isGameOver();
    if (isGameOver) {
      // Update the game status in the database or perform any additional end-game logic
      // Example:
      await prisma.game.update({
        where: { id: game.id },
        data: { active: false },
      });
    }

    return NextResponse.json({
      message: "Move saved",
      move: { from, to, promotion },
      gameOver: isGameOver,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to save move" }, { status: 500 });
  }
}
