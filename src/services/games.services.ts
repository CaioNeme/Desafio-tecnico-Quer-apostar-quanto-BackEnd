import { badRequest, notFoundError } from '@/errors';
import { gameRepository } from '@/repositories/game.repository';

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = await gameRepository.createGame(homeTeamName, awayTeamName);
  return game;
}
async function getAllGames() {
  const games = await gameRepository.getAllGames();
  return games;
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  await valideteGame(id);
  await validateGameFinish(id);

  const game = await gameRepository.finishGame(id, homeTeamScore, awayTeamScore);

  return game;
}

async function getGameById(id: number) {
  await valideteGame(id);
  const game = await gameRepository.getGameById(id);
  return game;
}

async function validateGameFinish(idGame: number) {
  const game = await gameRepository.getGameById(idGame);

  if (game.isFinished) {
    throw badRequest('Game already finished');
  }
}
async function valideteGame(idGame: number) {
  const game = await gameRepository.getGameById(idGame);

  if (!game) {
    throw notFoundError('Game not found');
  }
}

export const gameServices = {
  createGame,
  getAllGames,
  finishGame,
  getGameById,
};
