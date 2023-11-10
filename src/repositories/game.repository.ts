import prisma from "@/config/database";

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    },
  });
  return game;
}

async function getGames() {
  const games = prisma.game.findMany();
  return games;
}

async function finishGame(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number
) {
  const game = prisma.game.update({
    where: {
      id,
    },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
    },
  });

  return game;
}

async function getGameById(id: number) {
  const game = prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      Bet: true,
    },
  });
  return game;
}

export const gameRepository = {
  createGame,
  getGames,
  finishGame,
  getGameById,
};
