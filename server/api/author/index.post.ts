import { Author, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (e): Promise<Author> => {
    const prisma = new PrismaClient();

    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Author = await prisma.author.create({
            data: body
        });
        return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});