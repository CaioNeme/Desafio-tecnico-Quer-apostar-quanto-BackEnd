import Joi from 'joi';

const createGame = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

const finishGame = Joi.object({
  homeTeamScore: Joi.number().greater(-1).required(),
  awayTeamScore: Joi.number().greater(-1).required(),
});

export const gamesSchemas = {
  createGame,
  finishGame,
};
