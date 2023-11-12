import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { gamesFactory } from "./games.factory";
import { participantsFactory } from "./participants.factory";

async function createBet(
  homeTeamScore?: number,
  awayTeamScore?: number,
  amountBet?: number
) {
  const game = await gamesFactory.createGame();
  const participants = await participantsFactory.createParticipant();

  const bet = await prisma.bet.create({
    data: {
      homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 5 }),
      awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 5 }),
      amountBet: amountBet || 1000,
      gameId: game.id,
      participantId: participants.id,
      status: "PENDING",
    },
  });

  return bet;
}

export const betFactory = {
  createBet,
};
