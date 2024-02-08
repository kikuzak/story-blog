import type { PrefectureMasterSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll,
    getPosted,
} = createReadMethods<Prefecture>('prefecture');

function initialize(): Prefecture {
    return {
        id: 0,
        name: "",
    }
}

const PrefectureLogic = {
    getById,
    getMultiByKana,
    getAll,
    getPosted,
    initialize
};

export { PrefectureLogic };