import Joi from 'joi';

const createBet = Joi.object({
  homeTeamScore: Joi.number().greater(-1).required(),
  awayTeamScore: Joi.number().greater(-1).required(),
  amountBet: Joi.number().greater(0).required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});

export const betSchemas = {
  createBet,
};
