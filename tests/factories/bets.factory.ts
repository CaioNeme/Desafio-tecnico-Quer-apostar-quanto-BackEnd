import { faker } from '@faker-js/faker';
import { gamesFactory } from './games.factory';
import { participantsFactory } from './participants.factory';
import { prisma } from '@/config';

async function createBet(
  homeTeamScore?: number,
  awayTeamScore?: number,
  amountBet?: number,
  gameId?: number,
  participantId?: number,
) {
  const game = await gamesFactory.createGame();
  const participants = await participantsFactory.createParticipant(amountBet);

  const bet = await prisma.bet.create({
    data: {
      homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 5 }),
      awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 5 }),
      amountBet: amountBet || 1000,
      gameId: gameId || game.id,
      participantId: participantId || participants.id,
      status: 'PENDING',
    },
  });

  return bet;
}

export const betFactory = {
  createBet,
};
