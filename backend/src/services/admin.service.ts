import { PrismaClient, Admin } from "@prisma/client";

const prisma = new PrismaClient();

class AdminService {
  async create(data: Omit<Admin, "id" | "createdAt">) {
    return prisma.admin.create({ data });
  }

  async list(page?: number, pageSize?: number) {
    if (!page || !pageSize) {
      return prisma.admin.findMany({ orderBy: { createdAt: "desc" } });
    }
    const skip = (page - 1) * pageSize;
    const items = await prisma.admin.findMany({ skip, take: pageSize, orderBy: { createdAt: "desc" } });
    const total = await prisma.admin.count();
    return { data: items, currentPage: page, totalPages: Math.ceil(total / pageSize), totalItems: total };
  }

  async getById(id: string) {
    return prisma.admin.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<Omit<Admin, "id" | "createdAt">>) {
    return prisma.admin.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.admin.delete({ where: { id } });
  }
}

export default new AdminService();




