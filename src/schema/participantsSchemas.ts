import Joi from "joi";

const createParticipantSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().min(1000).required(),
});

export const participantsSchemas = {
  createParticipantSchema,
};
