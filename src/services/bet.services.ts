import { betRepository } from "@/repositories/bet.repository";

async function createBet(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number
) {
  const bet = await betRepository.createBet(
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId
  );

  return bet;
}

export const betService = {
  createBet,
};
