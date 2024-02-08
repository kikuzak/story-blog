import type { KanaLineMasterSchema } from "~/prisma/zod";
import { createReadMethods } from "./api-logic";

type KanaLine = Zod.infer<typeof KanaLineMasterSchema>;

const {
    getMultiByPosted,
} = createReadMethods<KanaLine>('kana-line');

async function getByName(name: string): Promise<Ref<KanaLine>> {
    const { data, error } = await useFetch('/api/kana-line', {
        query: {name: name}
    });
    if (error.value) throw(error.value);
    const typedData = data as Ref<KanaLine[]>;
    return ref<KanaLine>(typedData.value[0]) as Ref<KanaLine>;
}

const { update } = createWriteMethods<KanaLine>('kana-line');

function initialize(): KanaLine {
    return {
        id: 0,
        name: "",
        is_posted: false
    }
}

const KanaLineLogic = {
    getByName,
    getMultiByPosted,
    update,
    initialize
}
export { KanaLineLogic };