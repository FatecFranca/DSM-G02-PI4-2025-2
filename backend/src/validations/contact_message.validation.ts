import Joi from "joi";

const createContactMessageSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "O nome deve ser um texto.",
        "any.required": "O campo nome é obrigatório."
    }),
    email: Joi.string().email().required().messages({
        "string.email": "O email deve ser um endereço de email válido.",
        "any.required": "O campo email é obrigatório."
    }),
    message: Joi.string().required().messages({
        "string.base": "A mensagem deve ser um texto.",
        "any.required": "O campo mensagem é obrigatório."
    })
});

const updateContactMessageSchema = Joi.object({
    name: Joi.string().optional().messages({
        "string.base": "O nome deve ser um texto."
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "O email deve ser um endereço de email válido."
    }),
    message: Joi.string().optional().messages({
        "string.base": "A mensagem deve ser um texto."
    })
});

export { createContactMessageSchema, updateContactMessageSchema };
