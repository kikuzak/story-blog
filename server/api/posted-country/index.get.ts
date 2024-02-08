import { CountryMasterSchema } from '~/prisma/zod';
import { prisma } from '../../util/prisma-client';

type Country = Zod.infer<typeof CountryMasterSchema>;

export default defineEventHandler(async (e): Promise<Country[] | null> => {
    try {
        const countryIds = await prisma.article.findMany({
            select: {
                country_id: true
            },
            distinct: ['country_id']
        });

        const countryIdArray: number[] = countryIds.reduce((acc: number[], obj) => {
            if (obj.country_id !== null) {
                acc.push(obj.country_id);
            }
            return acc;
        }, []);
        if (countryIdArray.length === 0) return null;

        const countries = await prisma.countryMaster.findMany({ where: { id: { in: countryIdArray } } });
        return countries;

    } catch (e) {
        console.error(e);
        throw(e);
    }
});