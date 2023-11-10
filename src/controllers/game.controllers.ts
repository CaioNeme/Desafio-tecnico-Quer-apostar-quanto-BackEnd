import { gameServices } from "@/services/games.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body;

  const game = await gameServices.createGame(homeTeamName, awayTeamName);

  res.status(httpStatus.CREATED).send(game);
}

export async function getGames(req: Request, res: Response) {
  const games = await gameServices.getGames();
  res.status(httpStatus.OK).send(games);
}

export async function finishGame(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamScore, awayTeamScore } = req.body;
  const game = await gameServices.finishGame(
    Number(id),
    homeTeamScore,
    awayTeamScore
  );
  res.status(httpStatus.OK).send(game);
}

export async function getGameById(req: Request, res: Response) {
  const { id } = req.params;
  const game = await gameServices.getGameById(Number(id));
  res.status(httpStatus.OK).send(game);
}
