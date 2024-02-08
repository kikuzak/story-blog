import type { RegionMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Region = Zod.infer<typeof RegionMasterSchema>;

const {
    getById,
    getAll
} = createReadMethods<Region>('region');

function initialize(): Region {
    return {
        id: 0,
        name: "",
        is_posted: false
    }
}

const RegionLogic = {
    getById,
    getAll,
    initialize
}

export { RegionLogic };