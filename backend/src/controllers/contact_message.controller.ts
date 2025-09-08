import { Request, Response } from "express";
import ContactMessageService from "../services/contact_message.service";
import { createContactMessageSchema, updateContactMessageSchema } from "../validations/contact_message.validation";
import { handleError } from "../utils/errorHandler";

class ContactMessageController {
    async create(req: Request, res: Response) {
        const { error } = createContactMessageSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const contactMessage = await ContactMessageService.createContactMessage(req.body);
            return res.status(201).json(contactMessage);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao criar a mensagem de contato.");
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : undefined;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;

            const contactMessages = await ContactMessageService.getContactMessages(page, pageSize);
            return res.json(contactMessages);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar as mensagens de contato.", 400);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const contactMessage = await ContactMessageService.getContactMessageById(req.params.id);
            if (!contactMessage) return handleError(res, new Error("Mensagem de contato não encontrada."), "Mensagem de contato não encontrada.", 404);

            return res.json(contactMessage);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao buscar a mensagem de contato.", 400);
        }
    }

    async update(req: Request, res: Response) {
        const { error } = updateContactMessageSchema.validate(req.body);
        if (error) return handleError(res, new Error(error.details[0].message), "Erro de validação", 400);

        try {
            const updatedContactMessage = await ContactMessageService.updateContactMessage(req.params.id, req.body);
            return res.json(updatedContactMessage);
        } catch (err) {
            return handleError(res, err as Error, "Erro ao atualizar a mensagem de contato.", 400);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await ContactMessageService.deleteContactMessage(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return handleError(res, err as Error, "Erro ao deletar a mensagem de contato.", 400);
        }
    }
}

export default new ContactMessageController();
