import { Request, Response, NextFunction } from "express";
import ContactMessageService from "../services/contact_message.service";

export const validateContactMessageExists = async (req: Request, res: Response, next: NextFunction) => {
    const contactMessageId = req.params.id;
    const existingContactMessage = await ContactMessageService.getContactMessageById(contactMessageId);

    if (!existingContactMessage) {
        return res.status(404).json({ message: "Mensagem de contato não encontrada." });
    }
    next();
};
