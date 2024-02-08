import { PrefectureMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

export default defineEventHandler(async (e): Promise<Prefecture> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Prefecture = await prisma.prefectureMaster.update({
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