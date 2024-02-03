import type { ArticleSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Article = Zod.infer<typeof ArticleSchema>;

const {
    getById,
    getMultiByPage,
    getMultiByArticleCategory,
    getMultiByRegion,
    getMultiByCountry,
    getMultiByPrefecture,
    getMultiBySourceCategory,
    getByAuthor,
    getAll
} = createReadMethods<Article>('article');

const {
    post,
    update,
    deleteById
} = createWriteMethods<Article>('article');

function initialize(): Article {
    return {
        id: 0,
        class_number: null,
        article_category_id: null,
        region_id: null,
        country_id: null,
        period_id: null,
        prefecture_id: null,
        author_id: null,
        source_category_id: null,
        source: null,
        title:  "",
        kana: "",
        content: null,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: null,
        status: 0
    }
}

const Status = {
    Draft: 0,
    reserved: 1,
    published: 2
}

const ArticleLogic = {
    getById,
    getMultiByPage,
    getMultiByArticleCategory,
    getMultiByRegion,
    getMultiByCountry,
    getMultiByPrefecture,
    getMultiBySourceCategory,
    getByAuthor,
    getAll,
    post,
    update,
    deleteById,
    initialize,
    Status,
    // getPublishedById,
    // getPublised
}

export { ArticleLogic };