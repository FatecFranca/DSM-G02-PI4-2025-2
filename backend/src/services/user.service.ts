import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async create(data: Omit<User, "id" | "createdAt">) {
    return prisma.user.create({ data });
  }

  async list(page?: number, pageSize?: number) {
    if (!page || !pageSize) {
      return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    }
    const skip = (page - 1) * pageSize;
    const items = await prisma.user.findMany({ skip, take: pageSize, orderBy: { createdAt: "desc" } });
    const total = await prisma.user.count();
    return { data: items, currentPage: page, totalPages: Math.ceil(total / pageSize), totalItems: total };
  }

  async getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<Omit<User, "id" | "createdAt">>) {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

export default new UserService();




