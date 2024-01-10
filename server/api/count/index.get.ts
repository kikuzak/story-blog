import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (e): Promise<number | null> => {
    try {
        const prisma = new PrismaClient();
        const query = getQuery(e);

        switch (query.name) {
            case 'author':
                return await prisma.author.count();
            case 'article':
                return await prisma.article.count();
            default:
                return null;
        }

    } catch (e) {
        console.error(e);
        throw(e);
    }
});