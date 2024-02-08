import { prisma } from '../../util/prisma-client';
import { convertType } from "@/server/util/convert-type";
import { CountryMasterSchema } from "~/prisma/zod";

type Country = Zod.infer<typeof CountryMasterSchema>;

export default defineEventHandler(async (e): Promise<Country[] | null> => {
    try {
        const query = getQuery(e);
        const keys = Object.keys(query);

        // 検索条件をクエリから検索
        let cond: any = {};
        for (let i = 0; i < keys.length; i++) {
            cond[keys[i]] = convertType(query[keys[i]] as string);
        }

        // データの取得
        const data = await prisma.countryMaster.findMany({
            where: cond
        });

        if (data.length === 0) return null;
        else return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});