import Joi from "joi";

const createParkingSensorDataSchema = Joi.object({
    parkingSensorId: Joi.string().required().messages({
        "string.base": "O ID do sensor de estacionamento deve ser um texto.",
        "any.required": "O campo ID do sensor de estacionamento é obrigatório."
    }),
    data: Joi.string().required().messages({
        "string.base": "Os dados devem ser um texto.",
        "any.required": "O campo dados é obrigatório."
    })
});

const updateParkingSensorDataSchema = Joi.object({
    parkingSensorId: Joi.string().optional().messages({
        "string.base": "O ID do sensor de estacionamento deve ser um texto."
    }),
    data: Joi.string().optional().messages({
        "string.base": "Os dados devem ser um texto."
    })
});

export { createParkingSensorDataSchema, updateParkingSensorDataSchema };
