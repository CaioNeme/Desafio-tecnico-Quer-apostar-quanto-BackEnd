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

export const gameServices = {
  createGame,
  getGames,
  finishGame,
  getGameById,
};
