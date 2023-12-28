import { Article, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (e): Promise<Article> => {
    const prisma = new PrismaClient();

    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Article = await prisma.article.create({
            data: body
        });
        return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});