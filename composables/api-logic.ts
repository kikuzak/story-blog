export function createReadMethods<T>(name: string) {
    const uri = `/api/${name}`;
    
    // idとallは汎用なので作成
    async function getById(id: number): Promise<Ref<T>> {
        const { data, error } = await useFetch(uri, {
            query: {id: id}
        });
        if (error.value) throw(error.value);
        return data as Ref<T>;
    }

    async function getAll(): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri);
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    async function getMultiByPage(pageNumber: number, pageSize: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {
                page: pageNumber,
                size: pageSize
            }
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    async function getMultiByKana(kana: string): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {kana: kana}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    async function getMultiByRegion(region: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {region: region}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiByCountry(country: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {country: country}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiByPrefecture(prefecture: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {prefecture: prefecture}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiBySourceCategory(sourceCategory: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {source_category: sourceCategory}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getByAuthorId(authorId: number): Promise<Ref<T>> {
        const { data, error } = await useFetch(uri, {
            query: {author_id: authorId}
        });
        if (error.value) throw(error.value);
        return data as Ref<T>;
    }

    return {
        getById,
        getAll,
        getMultiByPage,
        getMultiByKana,
        getMultiByRegion,
        getMultiByCountry,
        getMultiByPrefecture,
        getMultiBySourceCategory,
        getByAuthorId
    };
}

export function createWriteMethods<T>(name: string) {
    const uri = `/api/${name}`;
    type EntityWithId = {
        id: number
    }

    async function post<T extends EntityWithId>(data: T): Promise<T> {
        const {id, ...withoutIdData} = data;
        const res = await $fetch(uri, {
            method: 'post',
            body: {data: withoutIdData}
        });
        await refreshNuxtData();
        return res as T;
    }
    
    async function update<T extends EntityWithId>(data: T): Promise<T> {

        const res = await $fetch(uri, {
            method: 'put',
            body: {
                id: data.id,
                data: data
            }
        });
        await refreshNuxtData();
        return res as T;
    }

    async function deleteById(id: number): Promise<T> {

        const res = await $fetch(uri, {
            method: 'delete',
            body: {id: id}
        });
        await refreshNuxtData();
        return res as T;
    }

    return {
        post,
        update,
        deleteById
    };
}