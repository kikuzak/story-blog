import { RegionMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Region = Zod.infer<typeof RegionMasterSchema>;

export default defineEventHandler(async (e): Promise<Region[] | null> => {
    try {
        const regionIds = await prisma.article.findMany({
            select: {
                region_id: true
            },
            distinct: ['region_id']
        });

        const regionIdArray: number[] = regionIds.reduce((acc: number[], obj) => {
            if (obj.region_id !== null) {
                acc.push(obj.region_id);
            }
            return acc;
        }, []);
        if (regionIdArray.length === 0) return null;

        const countries = await prisma.regionMaster.findMany({ where: { id: { in: regionIdArray } } });
        return countries;

    } catch (e) {
        console.error(e);
        throw(e);
    }
});