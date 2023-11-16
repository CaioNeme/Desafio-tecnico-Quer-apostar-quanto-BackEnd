import { participantsRepository } from '@/repositories/participants.repository';

async function createParticipant(name: string, balance: number) {
  const participant = await participantsRepository.createParticipant(name, balance);
  return participant;
}

async function getAllParticipants() {
  const participants = await participantsRepository.getAllParticipants();
  return participants;
}

export const participantsService = {
  createParticipant,
  getAllParticipants,
};
