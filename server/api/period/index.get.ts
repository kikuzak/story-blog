import { PeriodMaster, PrismaClient } from "@prisma/client";
import { convertType } from "@/server/util/convert-type";

export default defineEventHandler(async (e): Promise<PeriodMaster[]> => {
    const prisma = new PrismaClient();

    const query = getQuery(e);
    let data: PeriodMaster[] = [];
    let cond: any = {};
    

    let keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
        cond[keys[i]] = convertType(query[keys[i]] as string);
    }

    data = await prisma.periodMaster.findMany({
        where: cond
    });

    return data;
});

