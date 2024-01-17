import { prisma } from '../../util/prisma-client';
import { convertType } from "@/server/util/convert-type";
import { ArticleSchema } from "~/prisma/zod";

type Article = Zod.infer<typeof ArticleSchema>;

export default defineEventHandler(async (e): Promise<Article | Article[] | null> => {
    try {
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
            data = await prisma.article.findMany({
                where: where
            });
        } else {
            data = await prisma.article.findMany({
                where: where,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                orderBy: {kana: 'asc'}
            });
        }

        if (data.length === 0) return null;
        else if (query.page && query.size || query.length === 0) return data;
        else if (data.length === 1) return data[0];
        else return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});