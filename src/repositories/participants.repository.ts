import prisma from "@/config/database";

async function createParticipant(name: string, balance: number) {
  const participant = prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
  return participant;
}

export const participantsRepository = {
  createParticipant,
};
