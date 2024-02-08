import { PeriodMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Period = Zod.infer<typeof PeriodMasterSchema>;

export default defineEventHandler(async (e): Promise<Period> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Period = await prisma.periodMaster.update({
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