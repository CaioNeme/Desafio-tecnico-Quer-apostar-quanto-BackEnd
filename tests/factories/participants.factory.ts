import { prisma } from "@/config";

async function createParticipant(name: string, balance: number) {
  const participant = await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
  return participant;
}

async function getParticipantById(id: number) {
  const participant = await prisma.participant.findUnique({
    where: {
      id,
    },
  });

  return participant;
}

export const participantsFactory = {
  createParticipant,
  getParticipantById,
};
