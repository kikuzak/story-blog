import type { CountryMasterSchema } from "~/prisma/zod";
import { createReadMethods, createWriteMethods } from "./api-logic";

type Country = Zod.infer<typeof CountryMasterSchema>;

const {
    getById,
    getMultiByKana,
    getAll,
    getPosted
} = createReadMethods<Country>('country');

function initialize(): Country {
    return {
        id: 0,
        kana: "",
        name: "",
    }
}

const CountryLogic = {
    getById,
    getMultiByKana,
    getAll,
    getPosted,
    initialize,
};

export { CountryLogic };