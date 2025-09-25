// components/FavoriteLines.tsx
"use client";

import { useState } from "react";

type Line = {
  id: string;
  name: string;
  nextBus: string;
};

export default function FavoriteLines({ initialFavorites }: { initialFavorites: Line[] }) {
  const [favorites, setFavorites] = useState<Line[]>(initialFavorites);

  async function handleRemove(lineId: string) {
    try {
      await fetch(`/api/favorites/${lineId}`, {
        method: "DELETE",
      });
      setFavorites((prev) => prev.filter((line) => line.id !== lineId));
    } catch (error) {
      console.error("Erro ao remover favorita:", error);
    }
  }

  return (
    <div className="grid gap-4">
      {favorites.length > 0 ? (
        favorites.map((line) => (
          <div
            key={line.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow"
          >
            <div>
              <p className="text-lg font-bold">{line.name}</p>
              <p className="text-gray-500">Próximo: {line.nextBus}</p>
            </div>
            <button
              onClick={() => handleRemove(line.id)}
              className="text-red-500 hover:text-red-700 text-xl"
              aria-label={`Remover ${line.name}`}
            >
              ❌
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Você ainda não tem linhas favoritas.</p>
      )}
    </div>
  );
}
