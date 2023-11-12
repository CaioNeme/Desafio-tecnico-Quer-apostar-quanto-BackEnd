import { participantsRepository } from '@/repositories/participants.repository';

async function createParticipant(name: string, balance: number) {
  const participant = await participantsRepository.createParticipant(name, balance);
  return participant;
}

async function getParticipants() {
  const participants = await participantsRepository.getParticipants();
  return participants;
}

export const participantsService = {
  createParticipant,
  getParticipants,
};
