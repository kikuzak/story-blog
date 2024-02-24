import type { OldPrefectureMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type OldPrefecture = Zod.infer<typeof OldPrefectureMasterSchema>;

const {
    getById,
    getAll,
    getPosted
} = createReadMethods<OldPrefecture>('old-prefecture');

function initialize(): OldPrefecture {
    return {
        id: 0,
        name: "",
    }
}

const OldPrefectureLogic = {
    getById,
    getAll,
    getPosted,
    initialize,
};

export { OldPrefectureLogic };