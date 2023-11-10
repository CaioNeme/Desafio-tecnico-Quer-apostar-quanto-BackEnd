import { badRequest } from "@/errors";
import { participantsRepository } from "@/repositories/participants.repository";

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) {
    throw badRequest("Balance must be greater than 1000");
  }
  if (!name) {
    throw badRequest("Name is required");
  }
  if (typeof name !== "string") {
    throw badRequest("Name must be a string");
  }
  if (typeof balance !== "number") {
    throw badRequest("Balance must be a number");
  }

  const participant = await participantsRepository.createParticipant(
    name,
    balance
  );
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
