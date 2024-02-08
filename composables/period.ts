import type { PeriodMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Period = Zod.infer<typeof PeriodMasterSchema>;

const {
    getById,
    getAll,
    getMultiByPosted,
} = createReadMethods<Period>('period');

const { update } = createWriteMethods<Period>('period');

function initialize(): Period {
    return {
        id: 0,
        name: "",
        is_posted: false
    }
}

const PeriodLogic = {
    getById,
    getAll,
    getMultiByPosted,
    update,
    initialize
}
export { PeriodLogic };