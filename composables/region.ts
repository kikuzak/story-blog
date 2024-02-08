import type { RegionMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Region = Zod.infer<typeof RegionMasterSchema>;

const {
    getById,
    getAll,
    getMultiByPosted
} = createReadMethods<Region>('region');

const { update } = createWriteMethods<Region>('region');

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
    getMultiByPosted,
    update,
    initialize
}

export { RegionLogic };