import { PrismaClient, ContactMessage } from "@prisma/client";

const prisma = new PrismaClient();

class ContactMessageService {
    async createContactMessage(data: Omit<ContactMessage, "id" | "createdAt">) {
        return prisma.contactMessage.create({
            data,
        });
    }

    async getContactMessageById(id: string) {
        return prisma.contactMessage.findUnique({
            where: { id },
        });
    }

    async getContactMessages(page?: number, pageSize?: number) {
        if (!page || !pageSize) {
            return prisma.contactMessage.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        const skip = (page - 1) * pageSize;
        const contactMessages = await prisma.contactMessage.findMany({
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const totalContactMessages = await prisma.contactMessage.count();

        return {
            data: contactMessages,
            currentPage: page,
            totalPages: Math.ceil(totalContactMessages / pageSize),
            totalItems: totalContactMessages,
        };
    }

    async updateContactMessage(id: string, data: Partial<Omit<ContactMessage, "id" | "createdAt">>) {
        return prisma.contactMessage.update({
            where: { id },
            data,
        });
    }

    async deleteContactMessage(id: string) {
        return prisma.contactMessage.delete({
            where: { id },
        });
    }
}

export default new ContactMessageService();
