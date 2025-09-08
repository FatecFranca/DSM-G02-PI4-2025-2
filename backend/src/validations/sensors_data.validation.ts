import Joi from "joi";

const createSensorsDataSchema = Joi.object({
    sensorId: Joi.string().required().messages({
        "string.base": "O ID do sensor deve ser um texto.",
        "any.required": "O campo ID do sensor é obrigatório."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    data: Joi.string().required().messages({
        "string.base": "Os dados devem ser um texto.",
        "any.required": "O campo dados é obrigatório."
    })
});

const updateSensorsDataSchema = Joi.object({
    sensorId: Joi.string().optional().messages({
        "string.base": "O ID do sensor deve ser um texto."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    }),
    data: Joi.string().optional().messages({
        "string.base": "Os dados devem ser um texto."
    })
});

export { createSensorsDataSchema, updateSensorsDataSchema };
