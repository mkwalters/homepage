import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { from, to, promotion } = await req.json();
  // Handle the move data here, e.g., save to database or log it
  console.log("Move received:", { from, to, promotion });
  return NextResponse.json({ message: "Move received" });
}
