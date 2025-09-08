import Joi from "joi";

const createParkingSlotSchema = Joi.object({
    parkingId: Joi.string().required().messages({
        "string.base": "O ID do estacionamento deve ser um texto.",
        "any.required": "O campo ID do estacionamento é obrigatório."
    }),
    isAvailable: Joi.boolean().optional().messages({
        "boolean.base": "O campo disponível deve ser um valor booleano."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    number: Joi.number().integer().positive().required().messages({
        "number.base": "O número deve ser um número.",
        "number.integer": "O número deve ser um número inteiro.",
        "number.positive": "O número deve ser positivo.",
        "any.required": "O campo número é obrigatório."
    })
});

const updateParkingSlotSchema = Joi.object({
    parkingId: Joi.string().optional().messages({
        "string.base": "O ID do estacionamento deve ser um texto."
    }),
    isAvailable: Joi.boolean().optional().messages({
        "boolean.base": "O campo disponível deve ser um valor booleano."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    number: Joi.number().integer().positive().optional().messages({
        "number.base": "O número deve ser um número.",
        "number.integer": "O número deve ser um número inteiro.",
        "number.positive": "O número deve ser positivo."
    })
});

export { createParkingSlotSchema, updateParkingSlotSchema };
