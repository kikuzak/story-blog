import type { ArticleSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Article = Zod.infer<typeof ArticleSchema>;

const {
    getById,
    getMultiByPage,
    getMultiByRegion,
    getMultiByCountry,
    getMultiByPrefecture,
    getMultiBySourceCategory,
    getByAuthorId,
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
        is_public: false
    }
}

const ArticleLogic = {
    getById,
    getMultiByPage,
    getMultiByRegion,
    getMultiByCountry,
    getMultiByPrefecture,
    getMultiBySourceCategory,
    getByAuthorId,
    getAll,
    post,
    update,
    deleteById,
    initialize
}

export { ArticleLogic };