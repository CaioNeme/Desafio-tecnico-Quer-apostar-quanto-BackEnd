import { prisma } from '@/config/database';
import { bettingCalculators } from '@/utils/bettingCalculator';

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = await prisma.game.create({
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

async function getAllGames() {
  const games = await prisma.game.findMany();
  return games;
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  await updateBetFinhed(id, homeTeamScore, awayTeamScore);
  await updateAmoutWon(id);
  const game = await prisma.game.update({
    where: {
      id,
    },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
    },
  });
  await updateBalance(id);

  return game;
}

async function updateBetFinhed(idGame: number, homeTeamScore: number, awayTeamScore: number) {
  const bets = await prisma.bet.findMany({
    where: {
      gameId: idGame,
    },
  });
  bets.map(async (bet) => {
    if (bet.homeTeamScore == homeTeamScore && bet.awayTeamScore == awayTeamScore) {
      await prisma.bet.update({
        where: {
          id: bet.id,
          status: 'PENDING',
        },
        data: {
          status: 'WON',
          amountWon: 0,
        },
      });
    } else {
      await prisma.bet.update({
        where: {
          id: bet.id,
          status: 'PENDING',
        },
        data: {
          status: 'LOST',
          amountWon: 0,
        },
      });
    }
  });
}

async function updateAmoutWon(idGame: number) {
  const bets = await prisma.bet.findMany({
    where: {
      gameId: idGame,
    },
  });
  console.log(bets);
  const winningBets = await prisma.bet.findMany({
    where: {
      gameId: idGame,
      status: 'WON',
    },
  });
  const amountTotal = await prisma.bet.aggregate({
    _sum: {
      amountBet: true,
    },
    where: {
      gameId: idGame,
    },
  });
  const amountWin = await prisma.bet.aggregate({
    _sum: {
      amountBet: true,
    },
    where: {
      gameId: idGame,
      status: 'WON',
    },
  });
  winningBets.map(async (bet) => {
    await prisma.bet.update({
      where: {
        id: bet.id,
      },
      data: {
        amountWon: bettingCalculators(amountTotal._sum.amountBet, bet.amountBet, amountWin._sum.amountBet),
      },
    });
  });
}

async function updateBalance(gameId: number) {
  const winningBets = await prisma.bet.findMany({
    where: {
      gameId: gameId,
      status: 'WON',
    },
  });
  winningBets.map(async (bet) => {
    await prisma.participant.update({
      where: {
        id: bet.participantId,
      },
      data: {
        balance: { increment: bet.amountWon },
      },
    });
  });
}

async function getGameById(id: number) {
  const game = await prisma.game.findUnique({
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
  getAllGames,
  finishGame,
  getGameById,
};
