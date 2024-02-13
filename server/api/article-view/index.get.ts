import { prisma } from '../../util/prisma-client';
import { convertType } from "@/server/util/convert-type";;
import { ArticleView } from '@/composables/article-view';

export default defineEventHandler(async (e): Promise<ArticleView[] | null> => {
    try {
        const query = getQuery(e);
        const keys = Object.keys(query);

        // 検索条件をクエリから検索
        let where: any = {};
        let pageNumber: number = 0;
        let pageSize: number = 0;
        let searchText: string = "";
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == 'page') {
                pageNumber = Number(query[keys[i]]);
            } else if (keys[i] == 'size') {
                pageSize = Number(query[keys[i]]);
            } else if (keys[i] == 'text') {
                searchText = String(query[keys[i]]);
            } else {
                where[keys[i]] = convertType(query[keys[i]] as string);
            }
        }
        where['status'] = 2;

        const include = {
            article_category: {select: {name: true}},
            region: {select: {name: true}},
            country: {select: {name: true}},
            period: {select: {name: true}},
            prefecture: {select: {name: true}},
            source_category: {select: {name: true}}
        }

        // データの取得
        let data: any;
        if (searchText) {
            data = await prisma.article.findMany({
                where: {
                    AND: [
                        {
                            status: 2
                        },
                        {
                            OR: [
                                {
                                    title: {
                                        contains: searchText
                                    }
                                },
                                {
                                    content: {
                                        contains: searchText
                                    }
                                },
                                {
                                    author: {
                                        name: {
                                            contains: searchText
                                        }
                                    }
                                },
                                {
                                    source: {
                                        contains: searchText
                                    }
                                }
                            ]
                        }
                        
                    ]
                },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                include: include
            });
        } else if (pageNumber === 0 && pageSize === 0) {
            data = await prisma.article.findMany({
                where: where,
                include: include
            });
        } else {
            data = await prisma.article.findMany({
                where: where,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                include: include
            });
        }

        if (data.length === 0) return null;
        else return data;
    } catch (e) {
        console.error(e);
        throw(e);
    }
});