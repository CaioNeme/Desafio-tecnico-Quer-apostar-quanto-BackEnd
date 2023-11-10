import { prisma } from "@/config/database";

async function createBet(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number
) {
  const bet = await prisma.bet.create({
    data: {
      homeTeamScore,
      awayTeamScore,
      amountBet,
      gameId,
      participantId,
      status: "pending",
    },
  });

  await prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      balance: { decrement: amountBet },
    },
  });

  return bet;
}

export const betRepository = {
  createBet,
};
