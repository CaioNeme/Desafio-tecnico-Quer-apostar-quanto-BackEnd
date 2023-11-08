import { createParticipant } from "@/controllers/participants.controllers";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter.post("/participants", createParticipant);
participantsRouter.get("/participants");

export default participantsRouter;
