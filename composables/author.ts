import type { AuthorSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Author = Zod.infer<typeof AuthorSchema>;

const {
    getById,
    getAll,
    getMultiByPage,
    getMultiByKana
} = createReadMethods<Author>('author');

const {
    post,
    update,
    deleteById
} = createWriteMethods<Author>('author');

function initialize(): Author {
    return {
        id: 0,
        kana: "",
        name: "" 
    }
}

const AuthorLogic = {
    getById,
    getAll,
    getMultiByPage,
    getMultiByKana,
    post,
    update,
    deleteById,
    initialize
};

export { AuthorLogic };