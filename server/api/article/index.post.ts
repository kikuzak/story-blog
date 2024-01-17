import { Article } from "@prisma/client";
import { prisma } from '../../util/prisma-client';

export default defineEventHandler(async (e): Promise<Article> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Article = await prisma.article.create({
            data: body.data
        });
        return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});