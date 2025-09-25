import { NextResponse } from "next/server";

const linhas = [
  { id: 501, nome: "Centro/Iguatemi", origem: "Centro", destino: "Shopping Iguatemi", proximo: "14:45", em: "15min" },
  { id: 204, nome: "Terminal/Universidade", origem: "Terminal", destino: "Universidade", proximo: "15:05", em: "25min" },
  { id: 101, nome: "Centro/Aeroporto", origem: "Centro", destino: "Aeroporto", proximo: "15:15", em: "35min" },
];

export async function GET() {
  return NextResponse.json(linhas);
}
