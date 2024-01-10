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
        let where: any = {};
        let pageNumber: number = 0;
        let pageSize: number = 0;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == 'page') {
                pageNumber = Number(query[keys[i]]);
            } else if (keys[i] == 'size') {
                pageSize = Number(query[keys[i]]);
            } else {
                where[keys[i]] = convertType(query[keys[i]] as string);
            }
        }

        // データの取得
        let data: any;
        if (pageNumber === 0 && pageSize === 0) {
            data = await prisma.author.findMany({
                where: where
            });
        } else {
            data = await prisma.author.findMany({
                where: where,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                orderBy: {kana: 'asc'}
            });
        }

        if (data.length === 0) return null;
        if (data.length === 1) return data[0];
        else return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});