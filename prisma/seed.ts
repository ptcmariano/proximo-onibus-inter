import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Remover usuários existentes
  await prisma.usuario.deleteMany({});
  console.log('🗑️ Usuários removidos');

  // Inserir usuários iniciais
  await prisma.usuario.createMany({
    data: [
      { nome: 'Administrador', email: 'admin@example.com', senha: 'admin123' },
      { nome: 'Usuário Teste', email: 'teste@example.com', senha: 'teste123' },
    ]
  });
  console.log('✅ Usuários iniciais inseridos');

  // Inserir destinos
  const origemSaltoPirapora = await prisma.destinos.create({
    data: {
      nome: 'SALTO DE PIRAPORA (CAMPO LARGO)',
      cidade: 'Salto de Pirapora',
    },
  });

  const destinoSorocabacentro = await prisma.destinos.create({
    data: {
      nome: 'SOROCABA (CENTRO)',
      cidade: 'Sorocaba',
    },
  });

  // Inserir linha
  const linha6315 = await prisma.linhas.create({
    data: {
      codigo_linha: '6315',
      nome_linha: 'SALTO DE PIRAPORA (CAMPO LARGO) SOROCABA (CENTRO)',
      empresa: 'EXPRESSO AMARELINHO LTDA',
      status: true,
    },
  });

  // Inserir tipos de período
  const diasUteis = await prisma.tipos_periodo.create({
    data: {
      nome: 'Dias Úteis',
      descricao: 'Segunda a Sexta-feira',
    },
  });

  const sabados = await prisma.tipos_periodo.create({
    data: {
      nome: 'Sábados',
      descricao: 'Sábados',
    },
  });

  const domingosEferiados = await prisma.tipos_periodo.create({
    data: {
      nome: 'Domingos e Feriados',
      descricao: 'Domingos e Feriados',
    },
  });

  // Função para converter horário string para DateTime
  function criarDateTime(horario: string): Date {
    const hoje = new Date();
    const [hora, minuto] = horario.split(':').map(Number);
    const dataHorario = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDay());
    dataHorario.setHours(hora, minuto, 0, 0);
    return dataHorario;
  }

  // Horários dos Dias Úteis
  const horariosDiasUteis = [
    '04:00', '04:25', '05:00', '05:15', '05:25', '05:35', '05:50', '06:00',
    '06:12', '06:20', '06:30', '06:40', '06:50', '07:05', '07:15', '07:30',
    '07:45', '08:00', '08:25', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:20', '12:10', '13:00', '13:25', '13:50', '15:00', '16:00', '17:00',
    '17:30', '17:45', '18:00', '19:00', '21:00'
  ];

  // Horários dos Sábados
  const horariosSabados = [
    '04:15', '05:00', '05:25', '05:50', '06:05', '06:30', '06:45', '07:00',
    '07:15', '07:35', '07:50', '09:10', '09:40', '10:10', '10:40', '11:10',
    '11:40', '12:10', '13:10', '13:40', '14:10', '14:40', '15:10', '15:40',
    '16:10', '16:40', '17:10', '17:40', '18:10', '19:00', '21:10'
  ];

  // Horários dos Domingos e Feriados
  const horariosDomingosEferiados = [
    '05:00', '06:00', '07:10', '08:20', '09:30', '11:50', '13:00',
    '14:10', '15:20', '16:30', '17:50', '19:00', '21:20'
  ];

  // Inserir itinerários para Dias Úteis
  for (const horario of horariosDiasUteis) {
    await prisma.itinerarios.create({
      data: {
        linha_id: linha6315.id,
        origem_id: origemSaltoPirapora.id,
        destino_id: destinoSorocabacentro.id,
        horario_partida: criarDateTime(horario),
        tipo_periodo_id: diasUteis.id,
        ativo: true,
      },
    });
  }

  // Inserir itinerários para Sábados
  for (const horario of horariosSabados) {
    await prisma.itinerarios.create({
      data: {
        linha_id: linha6315.id,
        origem_id: origemSaltoPirapora.id,
        destino_id: destinoSorocabacentro.id,
        horario_partida: criarDateTime(horario),
        tipo_periodo_id: sabados.id,
        ativo: true,
      },
    });
  }

  // Inserir itinerários para Domingos e Feriados
  for (const horario of horariosDomingosEferiados) {
    await prisma.itinerarios.create({
      data: {
        linha_id: linha6315.id,
        origem_id: origemSaltoPirapora.id,
        destino_id: destinoSorocabacentro.id,
        horario_partida: criarDateTime(horario),
        tipo_periodo_id: domingosEferiados.id,
        ativo: true,
      },
    });
  }

  console.log('Seed concluído com sucesso!');
  console.log(`Linha criada: ${linha6315.codigo_linha} - ${linha6315.nome_linha}`);
  console.log(`Empresa: ${linha6315.empresa}`);
  console.log(`Origem: ${origemSaltoPirapora.nome}`);
  console.log(`Destino: ${destinoSorocabacentro.nome}`);
  console.log(`Total de horários inseridos:`);
  console.log(`- Dias Úteis: ${horariosDiasUteis.length}`);
  console.log(`- Sábados: ${horariosSabados.length}`);
  console.log(`- Domingos e Feriados: ${horariosDomingosEferiados.length}`);
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
