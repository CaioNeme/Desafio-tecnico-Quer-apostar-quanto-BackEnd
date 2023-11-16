import { prisma } from '@/config/database';
import { notFoundError } from '@/errors';
import { winningBetCalculator } from '@/utils/winningBetCalculator';

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

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  await betWin(id, homeTeamScore, awayTeamScore);
  await betLose(id, homeTeamScore, awayTeamScore);
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

async function betWin(gameId: number, homeTeamScore: number, awayTeamScore: number) {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  const bets = await prisma.bet.findMany({
    where: {
      gameId,
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
        },
      });
    }

    const bets = await prisma.bet.aggregate({
      where: {
        gameId,
      },
      _sum: {
        amountBet: true,
      },
    });

    const betWin = await prisma.bet.findMany({
      where: {
        gameId,
        status: 'WON',
      },
    });

    const betWinSum = await prisma.bet.aggregate({
      where: {
        gameId,
        status: 'WON',
      },
      _sum: {
        amountBet: true,
      },
    });

    betWin.map(async (bet) => {
      const betParticipant = await prisma.bet.findUnique({
        where: {
          id: bet.id,
          participantId: bet.participantId,
        },
      });

      await prisma.bet.update({
        where: {
          id: bet.id,
        },
        data: {
          amountWon: winningBetCalculator(bets._sum.amountBet, betParticipant.amountBet, betWinSum._sum.amountBet),
        },
      });

      const participant = await prisma.participant.findUnique({
        where: {
          id: bet.participantId,
        },
      });

      await prisma.participant.update({
        where: {
          id: bet.participantId,
        },
        data: {
          balance:
            participant.balance +
            winningBetCalculator(bets._sum.amountBet, betParticipant.amountBet, betWinSum._sum.amountBet),
        },
      });
    });
  });
}

async function betLose(gameId: number, homeTeamScore: number, awayTeamScore: number) {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  const bets = await prisma.bet.findMany({
    where: {
      gameId,
    },
  });

  bets.map(async (bet) => {
    if (bet.homeTeamScore != homeTeamScore && bet.awayTeamScore != awayTeamScore) {
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
  getGames,
  finishGame,
  getGameById,
};
