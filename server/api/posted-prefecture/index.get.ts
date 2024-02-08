import { PrefectureMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

export default defineEventHandler(async (e): Promise<Prefecture[] | null> => {
    try {
        const prefectureIds = await prisma.article.findMany({
            select: {
                prefecture_id: true
            },
            distinct: ['prefecture_id']
        });

        const prefectureIdArray: number[] = prefectureIds.reduce((acc: number[], obj) => {
            if (obj.prefecture_id !== null) {
                acc.push(obj.prefecture_id);
            }
            return acc;
        }, []);
        if (prefectureIdArray.length === 0) return null;

        const countries = await prisma.prefectureMaster.findMany({ where: { id: { in: prefectureIdArray } } });
        return countries;

    } catch (e) {
        console.error(e);
        throw(e);
    }
});