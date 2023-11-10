import {
  createGame,
  finishGame,
  getGameById,
  getGames,
} from "@/controllers/game.controllers";
import { validateBody } from "@/middlewares/validation";
import { gamesSchemas } from "@/schema/gamesSchemas";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/games", validateBody(gamesSchemas.createGame), createGame);
gameRouter.post(
  "/games/:id/finish",
  validateBody(gamesSchemas.finishGame),
  finishGame
);
gameRouter.get("/games", getGames);
gameRouter.get("/games/:id", getGameById);

export default gameRouter;
