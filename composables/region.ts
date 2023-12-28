import type { RegionMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Region = Zod.infer<typeof RegionMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<Region>('region');

export {
    getById,
    getAll
};