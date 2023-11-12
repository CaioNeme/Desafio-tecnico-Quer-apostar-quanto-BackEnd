import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

async function createParticipant(balance?: number) {
  const participant = await prisma.participant.create({
    data: {
      name: faker.person.fullName(),
      balance: balance || 1000,
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
