import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  passwordHash: Joi.string().min(8).required(),
  isActive: Joi.boolean().optional(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(2).max(120).optional(),
  email: Joi.string().email().optional(),
  passwordHash: Joi.string().min(8).optional(),
  isActive: Joi.boolean().optional(),
});



