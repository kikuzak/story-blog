import type { PrefectureMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll
} = createReadMethods<Prefecture>('prefecture');

export {
    getById,
    getMultiByKana,
    getAll
};