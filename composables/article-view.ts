import { createReadMethods, createWriteMethods } from "./api-logic";

type ArticleView = {
    id: number,
    class_number: string | null,
    article_category_id: number | null
    article_category: {name: string | null},
    region_id: number | null,
    region: {name: string | null},
    country_id: number | null,
    country: {name: string | null},
    period_id: number | null,
    period: {name: string | null},
    prefecture_id: number | null,
    prefecture: {name: string | null},
    author_id: number | null
    author: {name: string | null},
    source_category_id: number | null,
    source_category: {name: string | null},
    source: string | null,
    title: string,
    kana: string,
    content: string | null,
    created_at: Date,
    updated_at: Date,
    published_at: Date | null,
    status: number
}

const {
    getById,
    getMultiByArticleCategory
} = createReadMethods<ArticleView>('article-view');

const ArticleViewLogic = {
    getById,
    getMultiByArticleCategory
}

export { ArticleViewLogic };