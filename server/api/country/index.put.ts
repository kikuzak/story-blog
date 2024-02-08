import { prisma } from '../../util/prisma-client';
import { CountryMasterSchema } from "~/prisma/zod";

type Country = Zod.infer<typeof CountryMasterSchema>;

export default defineEventHandler(async (e): Promise<Country> => {
    const body = await readBody(e);

    if (!body) console.error(e);

    try {
        let data: Country = await prisma.countryMaster.update({
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