import type { CountryMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type Country = Zod.infer<typeof CountryMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll,
    getMultiByPosted
} = createReadMethods<Country>('country');

const { update } = createWriteMethods<Country>('country');

function initialize(): Country {
    return {
        id: 0,
        kana: "",
        name: "",
        is_posted: false
    }
}

const CountryLogic = {
    getById,
    getMultiByKana,
    getAll,
    getMultiByPosted,
    update,
    initialize
};

export { CountryLogic };