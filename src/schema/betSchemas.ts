import Joi from 'joi';

const createBet = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});

export const betSchemas = {
  createBet,
};
