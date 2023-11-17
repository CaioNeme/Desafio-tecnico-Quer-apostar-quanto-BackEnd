import { Router } from 'express';
import { createGame, finishGame, getGameById, getAllGames } from '@/controllers/game.controllers';
import { validateBody } from '@/middlewares/validationSchema';
import { gamesSchemas } from '@/schema/gamesSchemas';

const gameRouter = Router();

gameRouter.post('/games', validateBody(gamesSchemas.createGameSchema), createGame);
gameRouter.post('/games/:id/finish', validateBody(gamesSchemas.finishGameSchema), finishGame);
gameRouter.get('/games', getAllGames);
gameRouter.get('/games/:id', getGameById);

export default gameRouter;
