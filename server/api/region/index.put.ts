import { RegionMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Region = Zod.infer<typeof RegionMasterSchema>;

export default defineEventHandler(async (e): Promise<Region> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Region = await prisma.regionMaster.update({
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