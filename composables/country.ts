import type { CountryMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Country = Zod.infer<typeof CountryMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll
} = createReadMethods<Country>('country');

export {
    getById,
    getMultiByKana,
    getAll
}