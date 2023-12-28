import type { AuthorSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Author = Zod.infer<typeof AuthorSchema>;

const {
    getById,
    getAll,
    getMultiByKana
} = createReadMethods<Author>('author');

const {
    post,
    update,
    deleteById
} = createWriteMethods<Author>('author');

export {
    getById,
    getAll,
    getMultiByKana,
    post,
    update,
    deleteById
}