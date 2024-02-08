import { PeriodMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Period = Zod.infer<typeof PeriodMasterSchema>;

export default defineEventHandler(async (e): Promise<Period[] | null> => {
    try {
        const periodIds = await prisma.article.findMany({
            select: {
                period_id: true
            },
            distinct: ['period_id']
        });

        const periodIdArray: number[] = periodIds.reduce((acc: number[], obj) => {
            if (obj.period_id !== null) {
                acc.push(obj.period_id);
            }
            return acc;
        }, []);
        if (periodIdArray.length === 0) return null;

        const countries = await prisma.periodMaster.findMany({ where: { id: { in: periodIdArray } } });
        return countries;

    } catch (e) {
        console.error(e);
        throw(e);
    }
});