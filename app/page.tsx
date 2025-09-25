// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Bem-vindo ao App de Linhas
      </h1>
      <p className="text-gray-600 text-base sm:text-lg max-w-xl">
        Acompanhe os próximos ônibus das suas linhas favoritas em qualquer lugar,
        direto do seu celular ou computador.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white text-sm sm:text-base rounded-xl shadow hover:bg-blue-700 transition-colors"
      >
        Ir para Dashboard
      </Link>
    </main>
  );
}
