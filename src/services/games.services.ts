import { badRequest, notFoundError } from "@/errors";
import { gameRepository } from "@/repositories/game.repository";

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = await gameRepository.createGame(homeTeamName, awayTeamName);
  return game;
}
async function getGames() {
  const games = await gameRepository.getGames();
  return games;
}

async function finishGame(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number
) {
  await validateGameFinish(id);

  const game = await gameRepository.finishGame(
    id,
    homeTeamScore,
    awayTeamScore
  );

  return game;
}

async function getGameById(id: number) {
  const game = await gameRepository.getGameById(id);
  return game;
}

async function validateGameFinish(idGame: number) {
  const game = await gameRepository.getGameById(idGame);

  if (game.isFinished) {
    throw badRequest("Game already finished");
  }
}

export const gameServices = {
  createGame,
  getGames,
  finishGame,
  getGameById,
};
