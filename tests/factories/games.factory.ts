import { faker } from '@faker-js/faker';
import { prisma } from '@/config';

async function createGame() {
  const game = await prisma.game.create({
    data: {
      homeTeamName: faker.lorem.word(),
      awayTeamName: faker.lorem.word(),
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    },
  });

  return game;
}

async function finishGame() {
  const game = await createGame();

  const gameFinshed = await prisma.game.update({
    where: {
      id: game.id,
    },
    data: {
      isFinished: true,
      awayTeamScore: faker.number.int({ min: 0, max: 5 }),
      homeTeamScore: faker.number.int({ min: 0, max: 5 }),
    },
  });

  return gameFinshed;
}

export const gamesFactory = { createGame, finishGame };
