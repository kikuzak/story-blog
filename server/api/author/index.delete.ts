import { Author } from "@prisma/client";
import { prisma } from '../../util/prisma-client';

export default defineEventHandler(async (e): Promise<Author> => {
    const body = await readBody(e);

    if (!body) console.error(e);

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