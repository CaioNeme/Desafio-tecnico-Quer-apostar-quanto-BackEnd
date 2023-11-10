import Joi from "joi";

const createGame = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

const finishGame = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});

export const gamesSchemas = {
  createGame,
  finishGame,
};
