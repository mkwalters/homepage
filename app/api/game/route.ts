import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const game = await prisma.game.findFirst({
      where: { active: true },
      include: { moves: true },
    });
    if (!game) {
      return NextResponse.json({ error: "No active game" }, { status: 404 });
    }
    // Sort the moves by moveNumber
    game.moves = game.moves.sort((a, b) => a.moveNumber - b.moveNumber);

    return NextResponse.json({ game });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve moves" },
      { status: 500 }
    );
  }
}
