import { PrismaClient } from "@prisma/client"

// Evita que múltiplas instâncias do Prisma Client sejam criadas em ambiente de desenvolvimento
declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma
}

console.log("[PRISMA] Cliente configurado com sucesso.")

export default prisma 