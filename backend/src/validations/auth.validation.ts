import Joi from "joi";

export const registerSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


