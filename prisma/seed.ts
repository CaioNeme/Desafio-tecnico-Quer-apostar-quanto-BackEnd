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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
