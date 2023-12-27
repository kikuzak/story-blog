import { Author, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (e): Promise<Author> => {
    const prisma = new PrismaClient();

    const body = await readBody(e);

    if (!body) console.error(`API Error: Author update.`);

    try {
        let data: Author = await prisma.author.update({
            where: {
                id: body.id
            },
            data: body.data
        });
        return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});