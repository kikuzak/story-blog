import { KanaLineMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type KanaLine = Zod.infer<typeof KanaLineMasterSchema>;

export default defineEventHandler(async (e): Promise<KanaLine> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: KanaLine = await prisma.kanaLineMaster.update({
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