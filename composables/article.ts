import type { ArticleSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Article = Zod.infer<typeof ArticleSchema>;

const {
    getById,
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

export {
    getById,
    getMultiByRegion,
    getMultiByCountry,
    getMultiByPrefecture,
    getMultiBySourceCategory,
    getByAuthorId,
    getAll,
    post,
    update,
    deleteById
}