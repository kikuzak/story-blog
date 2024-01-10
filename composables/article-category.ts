import type { ArticleCategoryMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type ArticleCategory = Zod.infer<typeof ArticleCategoryMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<ArticleCategory>('article-category');

function initialize(): ArticleCategory {
    return {
        id: 0,
        name: ""
    }
}

const ArticleCategoryLogic = {
    getById,
    getAll,
    initialize
}

export {ArticleCategoryLogic };