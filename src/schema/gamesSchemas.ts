import Joi from 'joi';

const createGameSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

const finishGameSchema = Joi.object({
  homeTeamScore: Joi.number().greater(-1).required(),
  awayTeamScore: Joi.number().greater(-1).required(),
});

export const gamesSchemas = {
  createGameSchema,
  finishGameSchema,
};
