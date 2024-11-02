import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { from, to, promotion } = await req.json();

  try {
    const newMove = await prisma.move.create({
      data: {
        from,
        to,
        promotion,
        gameId: 1,
        moveNumber: 1,
      },
    });

    const newGame = await prisma.game.create({
      data: {},
    });

    return NextResponse.json({ message: "Move saved", move: newGame });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to save move" }, { status: 500 });
  }
}
