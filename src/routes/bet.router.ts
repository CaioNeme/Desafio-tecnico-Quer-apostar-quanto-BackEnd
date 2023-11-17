import { Router } from 'express';
import { createBet } from '@/controllers/bet.controllers';
import { validateBody } from '@/middlewares/validationSchema';
import { betSchemas } from '@/schema/betSchemas';

const betRouter = Router();

betRouter.post('/bets', validateBody(betSchemas.createBetSchema), createBet);

export default betRouter;
