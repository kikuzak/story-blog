import { OldPrefectureMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type OldPrefecture = Zod.infer<typeof OldPrefectureMasterSchema>;

export default defineEventHandler(async (e): Promise<OldPrefecture[] | null> => {
    try {
        const oldPrefectureIds = await prisma.article.findMany({
            select: {
                old_prefecture_id: true
            },
            distinct: ['old_prefecture_id']
        });

        const oldPrefectureIdArray: number[] = oldPrefectureIds.reduce((acc: number[], obj) => {
            if (obj.old_prefecture_id !== null) {
                acc.push(obj.old_prefecture_id);
            }
            return acc;
        }, []);
        if (oldPrefectureIdArray.length === 0) return null;

        const countries = await prisma.oldPrefectureMaster.findMany({ where: { id: { in: oldPrefectureIdArray } } });
        return countries;

    } catch (e) {
        console.error(e);
        throw(e);
    }
});