import { prisma } from '../../util/prisma-client';
import { convertType } from "@/server/util/convert-type";
import { ArticleCategoryMasterSchema } from "~/prisma/zod";

type ArticleCategory = Zod.infer<typeof ArticleCategoryMasterSchema>;

export default defineEventHandler(async (e): Promise<ArticleCategory | ArticleCategory[] | null> => {
    try {
        const query = getQuery(e);
        const keys = Object.keys(query);

        // 検索条件をクエリから検索
        let cond: any = {};
        for (let i = 0; i < keys.length; i++) {
            cond[keys[i]] = convertType(query[keys[i]] as string);
        }

        // データの取得
        const data = await prisma.articleCategoryMaster.findMany({
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