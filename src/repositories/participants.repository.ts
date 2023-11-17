import { prisma } from '@/config/database';

async function createParticipant(name: string, balance: number) {
  const participant = await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });

  return participant;
}

async function getAllParticipants() {
  const participants = await prisma.participant.findMany();

  return participants;
}

async function getParticipantById(id: number) {
  const participant = await prisma.participant.findUnique({
    where: {
      id,
    },
  });

  return participant;
}

export const participantsRepository = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
};
