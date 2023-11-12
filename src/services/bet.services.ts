import { badRequest } from "@/errors";
import { betRepository } from "@/repositories/bet.repository";
import { gameRepository } from "@/repositories/game.repository";
import { participantsRepository } from "@/repositories/participants.repository";

async function createBet(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number
) {
  await validateGameFinish(gameId);
  await validateBalance(participantId, amountBet);
  const bet = await betRepository.createBet(
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId
  );

  return bet;
}

async function validateBalance(idPaticipant: number, amountBet: number) {
  const participant = await participantsRepository.getParticipantById(
    idPaticipant
  );

  if (participant.balance < amountBet) {
    throw badRequest("Insufficient balance");
  }
}

async function validateGameFinish(idGame: number) {
  const game = await gameRepository.getGameById(idGame);

  if (game.isFinished) {
    throw badRequest("Game already finished");
  }
}

export const betService = {
  createBet,
};
