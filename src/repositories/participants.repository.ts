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

async function getParticipants() {
  const participants = prisma.participant.findMany();
  return participants;
}

export const participantsRepository = {
  createParticipant,
  getParticipants,
};
