import {
  createParticipant,
  getParticipants,
} from "@/controllers/participants.controllers";
import { validateBody } from "@/middlewares/validation";
import { participantsSchemas } from "@/schema/participantsSchemas";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter.post(
  "/participants",
  validateBody(participantsSchemas.createParticipantSchema),
  createParticipant
);
participantsRouter.get("/participants", getParticipants);

export default participantsRouter;
