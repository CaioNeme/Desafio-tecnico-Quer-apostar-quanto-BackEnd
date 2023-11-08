import { participantsService } from "@/services/participants.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createParticipant(req: Request, res: Response) {
  const { name, balance } = req.body;
  const participant = await participantsService.createParticipant(
    name,
    balance
  );
  res.status(httpStatus.CREATED).send(participant);
}
