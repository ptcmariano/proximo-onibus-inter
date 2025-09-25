import { prisma } from "@/lib/prisma";
import FavoriteLines from "@/components/FavoriteLines";
import AvailableLines from "@/components/AvailableLines";

export default async function DashboardPage() {
  const userId = "mock-user-123";

  const favorites = await prisma.favoriteLine.findMany({
    where: { userId },
    include: { line: true },
  });

  const allLines = await prisma.line.findMany();
  const favoriteIds = favorites.map((f) => f.lineId);

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-8">
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

      <section>
        <h2 className="text-xl font-bold mb-4">➕ Adicionar Nova Linha</h2>
        <AvailableLines
          initialLines={allLines.map((l) => ({ id: l.id, name: l.name }))}
          currentFavorites={favoriteIds}
        />
      </section>
    </main>
  );
}
