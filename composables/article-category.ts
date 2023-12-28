import type { ArticleCategoryMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type ArticleCategory = Zod.infer<typeof ArticleCategoryMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<ArticleCategory>('article-category');

export {
    getById,
    getAll
};