import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { participantsService } from '@/services/participants.services';

export async function createParticipant(req: Request, res: Response) {
  const { name, balance } = req.body;
  const participant = await participantsService.createParticipant(name, balance);
  res.status(httpStatus.CREATED).send(participant);
}

export async function getAllParticipants(req: Request, res: Response) {
  const participants = await participantsService.getAllParticipants();
  res.status(httpStatus.OK).send(participants);
}
