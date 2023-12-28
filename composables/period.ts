import type { PeriodMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Period = Zod.infer<typeof PeriodMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<Period>('period');

export {
    getById,
    getAll
};