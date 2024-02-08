import type { RegionMasterSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Region = Zod.infer<typeof RegionMasterSchema>;

const {
    getById,
    getAll,
} = createReadMethods<Region>('region');

function initialize(): Region {
    return {
        id: 0,
        name: "",
    }
}

const RegionLogic = {
    getById,
    getAll,
    initialize
}

export { RegionLogic };