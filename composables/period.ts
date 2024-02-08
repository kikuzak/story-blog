import type { PeriodMasterSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Period = Zod.infer<typeof PeriodMasterSchema>;

const {
    getById,
    getAll,
    getPosted
} = createReadMethods<Period>('period');

function initialize(): Period {
    return {
        id: 0,
        name: "",
    }
}

const PeriodLogic = {
    getById,
    getAll,
    getPosted,
    initialize
}
export { PeriodLogic };