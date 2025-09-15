import prisma from "@/lib/prisma";
import { CreateContactMessageInput, UpdateContactMessageInput, ContactMessageQueryInput } from "@/lib/validations/contactMessage";

export class ContactMessageService {
  /**
   * Cria uma nova mensagem de contato
   */
  static async create(data: CreateContactMessageInput) {
    try {
      const contactMessage = await prisma.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      });

      return { success: true, data: contactMessage };
    } catch (error) {
      console.error("Erro ao criar mensagem de contato:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  /**
   * Busca todas as mensagens de contato com paginação e filtros
   */
  static async findAll(query: ContactMessageQueryInput) {
    try {
      const { page = 1, limit = 10, viewed, search } = query;
      const skip = (page - 1) * limit;

      // Construir filtros
      const where: any = {};

      if (viewed !== undefined) {
        where.viewed = viewed;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' as any } },
          { email: { contains: search, mode: 'insensitive' as any } },
          { message: { contains: search, mode: 'insensitive' as any } },
        ];
      }

      // Buscar mensagens
      const [messages, total] = await Promise.all([
        prisma.contactMessage.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.contactMessage.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          messages,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
      };
    } catch (error) {
      console.error("Erro ao buscar mensagens de contato:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  /**
   * Busca uma mensagem de contato por ID
   */
  static async findById(id: string) {
    try {
      const contactMessage = await prisma.contactMessage.findUnique({
        where: { id },
      });

      if (!contactMessage) {
        return { success: false, error: "Mensagem não encontrada" };
      }

      return { success: true, data: contactMessage };
    } catch (error) {
      console.error("Erro ao buscar mensagem de contato:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }

  /**
   * Atualiza o status de visualização de uma mensagem
   */
  static async updateViewed(id: string, data: UpdateContactMessageInput) {
    try {
      const contactMessage = await prisma.contactMessage.update({
        where: { id },
        data: { viewed: data.viewed },
      });

      return { success: true, data: contactMessage };
    } catch (error) {
      console.error("Erro ao atualizar mensagem de contato:", error);

      if (error instanceof Error && error.message.includes("Record to update not found")) {
        return { success: false, error: "Mensagem não encontrada" };
      }

      return { success: false, error: "Erro interno do servidor" };
    }
  }

  /**
   * Deleta uma mensagem de contato
   */
  static async delete(id: string) {
    try {
      await prisma.contactMessage.delete({
        where: { id },
      });

      return { success: true, message: "Mensagem deletada com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar mensagem de contato:", error);

      if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
        return { success: false, error: "Mensagem não encontrada" };
      }

      return { success: false, error: "Erro interno do servidor" };
    }
  }

  /**
   * Busca estatísticas das mensagens de contato
   */
  static async getStats() {
    try {
      const [total, viewed, unviewed] = await Promise.all([
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { viewed: true } }),
        prisma.contactMessage.count({ where: { viewed: false } }),
      ]);

      return {
        success: true,
        data: {
          total,
          viewed,
          unviewed,
          viewedPercentage: total > 0 ? Math.round((viewed / total) * 100) : 0,
        },
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      return { success: false, error: "Erro interno do servidor" };
    }
  }
}
