import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const games = await prisma.game.findMany();
  if (games.length === 0) {
    await prisma.game.create({
      data: {
        homeTeamName: 'Team A',
        awayTeamName: 'Team B',
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: false,
      },
    });
  }
  const participants = await prisma.participant.findMany();
  if (participants.length === 0) {
    await prisma.participant.create({
      data: {
        name: 'Joao',
        balance: 1000,
      },
    });
    await prisma.participant.create({
      data: {
        name: 'Maria',
        balance: 2000,
      },
    });
    await prisma.participant.create({
      data: {
        name: 'Jose',
        balance: 3000,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
