export function createReadMethods<T>(name: string) {
    const uri = `/api/${name}`;
    
    // idとallは汎用なので作成
    function getById(id: number): Ref<T> {
        const { data, error } = useFetch(uri, {
            query: {id: id}
        });
        if (error.value) throw(error.value);
        return data as Ref<T>;
    }

    function getAll(): Ref<T[]> {
        const { data, error } = useFetch(uri);
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    function getMultiByKana(kana: string): Ref<T[]> {
        const { data, error } = useFetch(uri, {
            query: {kana: kana}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    function getMultiByRegion(region: number): Ref<T[]> {
        const { data, error } = useFetch(uri, {
            query: {region: region}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    function getMultiByCountry(country: number): Ref<T[]> {
        const { data, error } = useFetch(uri, {
            query: {country: country}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    function getMultiByPrefecture(prefecture: number): Ref<T[]> {
        const { data, error } = useFetch(uri, {
            query: {prefecture: prefecture}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    function getMultiBySourceCategory(sourceCategory: number): Ref<T[]> {
        const { data, error } = useFetch(uri, {
            query: {source_category: sourceCategory}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    function getByAuthorId(authorId: number): Ref<T> {
        const { data, error } = useFetch(uri, {
            query: {author_id: authorId}
        });
        if (error.value) throw(error.value);
        return data as Ref<T>;
    }

    return {
        getById,
        getAll,
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

    async function post(data: T): Promise<T> {
        // 型チェック
        let bodyData: BodyInit | null = null;
        if (data instanceof URLSearchParams) {
            bodyData = data;
        } else {
            throw('createWriteMethod: post');
        }

        const res = await $fetch(uri, {
            method: 'post',
            body: bodyData
        });
        await refreshNuxtData();
        return res as T;
    }
    
    async function update(data: T): Promise<T> {
        // 型チェック
        let bodyData: BodyInit | null = null;
        if (data instanceof URLSearchParams) {
            bodyData = data;
        } else {
            throw('createWriteMethod: update');
        }

        const res = await $fetch(uri, {
            method: 'put',
            body: bodyData
        });
        await refreshNuxtData();
        return res as T;
    }

    async function deleteById(data: T): Promise<T> {
        // 型チェック
        let bodyData: BodyInit | null = null;
        if (data instanceof URLSearchParams) {
            bodyData = data;
        } else {
            throw('createWriteMethod: delete');
        }

        const res = await $fetch(uri, {
            method: 'delete',
            body: bodyData
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