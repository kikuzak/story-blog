import type { PrefectureMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll,
    getMultiByPosted
} = createReadMethods<Prefecture>('prefecture');

const { update } = createWriteMethods<Prefecture>('prefecture');

function initialize(): Prefecture {
    return {
        id: 0,
        name: "",
        is_posted: false
    }
}

const PrefectureLogic = {
    getById,
    getMultiByKana,
    getAll,
    getMultiByPosted,
    update,
    initialize
};

export { PrefectureLogic };