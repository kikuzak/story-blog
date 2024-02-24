import { OldPrefectureMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type OldPrefecture = Zod.infer<typeof OldPrefectureMasterSchema>;

export default defineEventHandler(async (e): Promise<OldPrefecture> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: OldPrefecture = await prisma.oldPrefectureMaster.update({
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