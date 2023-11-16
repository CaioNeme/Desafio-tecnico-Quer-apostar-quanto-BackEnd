import { Router } from 'express';
import { createParticipant, getAllParticipants } from '@/controllers/participants.controllers';
import { validateBody } from '@/middlewares/validation';
import { participantsSchemas } from '@/schema/participantsSchemas';

const participantsRouter = Router();

participantsRouter.post('/participants', validateBody(participantsSchemas.createParticipantSchema), createParticipant);
participantsRouter.get('/participants', getAllParticipants);

export default participantsRouter;
