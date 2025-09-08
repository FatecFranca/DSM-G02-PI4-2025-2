import Joi from "joi";

const createSensorsSchema = Joi.object({
    parkingSlotId: Joi.string().required().messages({
        "string.base": "O ID da vaga de estacionamento deve ser um texto.",
        "any.required": "O campo ID da vaga de estacionamento é obrigatório."
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
    type: Joi.string().valid('IR', 'ULTRASONIC', 'RFID', 'CAMERA').required().messages({
        "string.base": "O tipo deve ser um texto.",
        "any.only": "O tipo deve ser IR, ULTRASONIC, RFID ou CAMERA.",
        "any.required": "O campo tipo é obrigatório."
    })
});

const updateSensorsSchema = Joi.object({
    parkingSlotId: Joi.string().optional().messages({
        "string.base": "O ID da vaga de estacionamento deve ser um texto."
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
    type: Joi.string().valid('IR', 'ULTRASONIC', 'RFID', 'CAMERA').optional().messages({
        "string.base": "O tipo deve ser um texto.",
        "any.only": "O tipo deve ser IR, ULTRASONIC, RFID ou CAMERA."
    })
});

export { createSensorsSchema, updateSensorsSchema };
