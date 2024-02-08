import type { PeriodMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Period = Zod.infer<typeof PeriodMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<Period>('period');

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
    initialize
}
export { PeriodLogic };