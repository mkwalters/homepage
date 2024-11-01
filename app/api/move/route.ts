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
      },
    });

    return NextResponse.json({ message: "Move saved", move: newMove });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to save move" }, { status: 500 });
  }
}
