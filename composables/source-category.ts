import type { SourceCategoryMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type SourceCategory = Zod.infer<typeof SourceCategoryMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<SourceCategory>('source-category');

function initialize(): SourceCategory {
    return {
        id: 0,
        name: "" 
    }
}

const SourceCategoryLogic = {
    getById,
    getAll,
    initialize
};

export { SourceCategoryLogic };