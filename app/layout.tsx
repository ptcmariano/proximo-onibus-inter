// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Linhas de Ônibus",
  description: "App para acompanhar linhas favoritas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="w-full bg-blue-600 text-white p-4 sm:p-6 shadow-md">
            <h1 className="text-lg sm:text-xl font-semibold text-center">
              Linhas de Ônibus
            </h1>
          </header>
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="w-full bg-gray-200 text-gray-600 text-xs sm:text-sm text-center p-4">
            © {new Date().getFullYear()} App Linhas. Todos os direitos reservados.
          </footer>
        </div>
      </body>
    </html>
  );
}
