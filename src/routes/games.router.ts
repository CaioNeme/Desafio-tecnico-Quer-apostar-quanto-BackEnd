import {
  createGame,
  finishGame,
  getGameById,
  getGames,
} from "@/controllers/game.controllers";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/games", createGame);
gameRouter.post("/games/:id/finish", finishGame);
gameRouter.get("/games", getGames);
gameRouter.get("/games/:id", getGameById);

export default gameRouter;
