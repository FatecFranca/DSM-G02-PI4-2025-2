import Joi from "joi";

const createParkingSensorSchema = Joi.object({
    parkingId: Joi.string().required().messages({
        "string.base": "O ID do estacionamento deve ser um texto.",
        "any.required": "O campo ID do estacionamento é obrigatório."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    name: Joi.string().required().messages({
        "string.base": "O nome deve ser um texto.",
        "any.required": "O campo nome é obrigatório."
    }),
    description: Joi.string().optional().messages({
        "string.base": "A descrição deve ser um texto."
    }),
    type: Joi.string().valid('TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS').required().messages({
        "string.base": "O tipo deve ser um texto.",
        "any.only": "O tipo deve ser TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION ou GAS.",
        "any.required": "O campo tipo é obrigatório."
    })
});

const updateParkingSensorSchema = Joi.object({
    parkingId: Joi.string().optional().messages({
        "string.base": "O ID do estacionamento deve ser um texto."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    name: Joi.string().optional().messages({
        "string.base": "O nome deve ser um texto."
    }),
    description: Joi.string().optional().messages({
        "string.base": "A descrição deve ser um texto."
    }),
    type: Joi.string().valid('TEMPERATURE', 'HUMIDITY', 'LIGHT', 'PRESSURE', 'SOUND', 'VIBRATION', 'MOTION', 'GAS').optional().messages({
        "string.base": "O tipo deve ser um texto.",
        "any.only": "O tipo deve ser TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION ou GAS."
    })
});

export { createParkingSensorSchema, updateParkingSensorSchema };
