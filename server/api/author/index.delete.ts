import { Author, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (e): Promise<Author> => {
    const prisma = new PrismaClient();

    const body = await readBody(e);

    if (!body) console.error("`API Error: Arthor Create.");

    try {
        let data: Author = await prisma.author.delete({
            where: {
                id: body.id
            }
        });
        return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});