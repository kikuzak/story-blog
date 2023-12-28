import { PrismaClient } from "@prisma/client";
import { convertType } from "@/server/util/convert-type";
import { AuthorSchema } from "~/prisma/zod";

type Author = Zod.infer<typeof AuthorSchema>;

export default defineEventHandler(async (e): Promise<Author | Author[] | null> => {
    try {
        const prisma = new PrismaClient();
        const query = getQuery(e);
        const keys = Object.keys(query);

        // 検索条件をクエリから検索
        let cond: any = {};
        for (let i = 0; i < keys.length; i++) {
            cond[keys[i]] = convertType(query[keys[i]] as string);
        }

        // データの取得
        const data = await prisma.author.findMany({
            where: cond
        });

        if (data.length === 0) return null;
        if (data.length === 1) return data[0];
        else return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});