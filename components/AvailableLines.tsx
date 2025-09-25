// components/AvailableLines.tsx
"use client";

import { use, useState } from "react";


type Line = {
  id: string;
  name: string;
};

export default function AvailableLines({
  initialLines,
  currentFavorites,
}: {
  initialLines: Line[];
  currentFavorites: string[];
}) {
  const [favorites, setFavorites] = useState<string[]>(currentFavorites);

  async function handleAddFavorite(lineId: string) {
    try {
      await fetch("/api/favorita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, userId: "1" }), // Usando ID de usuário fixo para exemplo
      });
      setFavorites((prev) => [...prev, lineId]);
    } catch (error) {
      console.error("Erro ao adicionar favorita:", error);
    }
  }

  return (
    <div className="grid gap-4">
      {initialLines.map((line) => {
        const isFavorite = favorites.includes(line.id);
        return (
          <div
            key={line.id}
            className="flex items-center justify-between p-4 bg-blue-600 rounded-xl shadow"
          >
            <p className="font-medium">{line.name}</p>
            {isFavorite ? (
              <span className="text-gray-900">✅ Favorito</span>
            ) : (
              <button
                onClick={() => handleAddFavorite(line.id)}
                className="text-yellow-500 hover:text-yellow-600 text-xl"
                aria-label={`Adicionar ${line.name} aos favoritos`}
              >
                ⭐
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
