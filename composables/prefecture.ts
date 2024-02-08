import type { PrefectureMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Prefecture = Zod.infer<typeof PrefectureMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll
} = createReadMethods<Prefecture>('prefecture');

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
    initialize
};

export { PrefectureLogic };