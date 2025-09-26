// app/page.tsx
import Link from "next/link";
import FavoriteLines from "@/components/FavoriteLines";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const userId = "mock-user-123";

  const favorites = await prisma.favoriteLine.findMany({
    where: { userId },
    include: { line: true },
  });
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        App próximo ônibus
      </h2>
      <section>
        <h2 className="text-xl font-bold mb-4">🚍 Minhas Linhas Favoritas</h2>
        <FavoriteLines
          initialFavorites={favorites.map((f) => ({
            id: f.line.id,
            name: f.line.name,
            nextBus: "em breve...", // aqui entraria a chamada real da API de horários
          }))}
        />
      </section>
    </main>
  );
}
