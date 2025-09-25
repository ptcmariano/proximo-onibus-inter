import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

let favorita: any = null;

export async function GET() {
  return NextResponse.json(favorita);
}

export async function POST(req: Request) {
  const body = await req.json();
  validateBody(body)

  const user = await prisma.user.findUnique({ where: { id: body.userId } });
  const line = await prisma.line.findUnique({ where: { id: body.lineId } });
  if (!user || !line) {
    return NextResponse.json({ error: "User or Line not found" }, { status: 400 });
  }
  await prisma.favoriteLine.create({ data: { lineId: body.lineId, userId: body.userId } });
  return NextResponse.json({ message: "Linha favorita salva com sucesso!", favorita });
}

function validateBody(body: FavoriteLine) {
  if (!body.lineId || !body.userId || typeof body.lineId !== "string" || typeof body.userId !== "string") {
    throw new Error("Invalid request body");
  }
}

type FavoriteLine = {
  lineId: string;
  userId: string;
};