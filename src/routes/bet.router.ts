import { Router } from 'express';
import { createBet } from '@/controllers/bet.controllers';
import { validateBody } from '@/middlewares/validation';
import { betSchemas } from '@/schema/betSchemas';

const betRouter = Router();

betRouter.post('/bets', validateBody(betSchemas.createBet), createBet);

export default betRouter;
