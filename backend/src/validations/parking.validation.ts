import Joi from "joi";

const createParkingSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "O nome deve ser um texto.",
        "any.required": "O campo nome é obrigatório."
    }),
    address: Joi.string().required().messages({
        "string.base": "O endereço deve ser um texto.",
        "any.required": "O campo endereço é obrigatório."
    }),
    country: Joi.string().required().messages({
        "string.base": "O país deve ser um texto.",
        "any.required": "O campo país é obrigatório."
    }),
    state: Joi.string().required().messages({
        "string.base": "O estado deve ser um texto.",
        "any.required": "O campo estado é obrigatório."
    }),
    city: Joi.string().required().messages({
        "string.base": "A cidade deve ser um texto.",
        "any.required": "O campo cidade é obrigatório."
    }),
    number: Joi.string().required().messages({
        "string.base": "O número deve ser um texto.",
        "any.required": "O campo número é obrigatório."
    }),
    phone: Joi.string().required().messages({
        "string.base": "O telefone deve ser um texto.",
        "any.required": "O campo telefone é obrigatório."
    }),
    description: Joi.string().optional().messages({
        "string.base": "A descrição deve ser um texto."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    })
});

const updateParkingSchema = Joi.object({
    name: Joi.string().optional().messages({
        "string.base": "O nome deve ser um texto."
    }),
    address: Joi.string().optional().messages({
        "string.base": "O endereço deve ser um texto."
    }),
    country: Joi.string().optional().messages({
        "string.base": "O país deve ser um texto."
    }),
    state: Joi.string().optional().messages({
        "string.base": "O estado deve ser um texto."
    }),
    city: Joi.string().optional().messages({
        "string.base": "A cidade deve ser um texto."
    }),
    number: Joi.string().optional().messages({
        "string.base": "O número deve ser um texto."
    }),
    phone: Joi.string().optional().messages({
        "string.base": "O telefone deve ser um texto."
    }),
    description: Joi.string().optional().messages({
        "string.base": "A descrição deve ser um texto."
    }),
    isActive: Joi.boolean().optional().messages({
        "boolean.base": "O campo ativo deve ser um valor booleano."
    })
});

export { createParkingSchema, updateParkingSchema };
