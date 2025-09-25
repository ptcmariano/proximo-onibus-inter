import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco...");

  const lines = await prisma.line.createMany({
    data: [
      { name: "Linha 100 - Centro" },
      { name: "Linha 200 - Bairro" },
      { name: "Linha 300 - Terminal" },
    ]
  });

  console.log(`✅ Linhas criadas: ${lines.count}`);

  const user = await prisma.user.upsert({
    where: { email: "teste@exemplo.com" },
    update: {},
    create: {
      email: "teste@exemplo.com",
    },
  });

  console.log(`👤 Usuário de exemplo criado: ${user.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
