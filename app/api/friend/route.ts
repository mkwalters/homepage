import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingFriend = await prisma.friend.findUnique({
      where: { email },
    });

    if (existingFriend) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 403 }
      );
    }

    const newFriend = await prisma.friend.create({
      data: { email },
    });

    return NextResponse.json(newFriend, { status: 201 });
  } catch (error) {
    console.error("Error creating friend:", error);
    return NextResponse.json(
      { error: "Failed to create friend" },
      { status: 500 }
    );
  }
}
