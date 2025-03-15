import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
