export function createReadMethods<T>(name: string) {
    const uri = `/api/${name}`;
    
    async function getById(id: number): Promise<Ref<T>> {
        const { data, error } = await useFetch(uri, {
            query: {id: id}
        });
        if (error.value) throw(error.value);
        const typedData = data as Ref<T[]>;
        if (typedData.value) {
            return ref<T>(typedData.value[0]) as Ref<T>;
        } else {
            throw("存在しない");
        }
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

    async function getMultiByArticleCategory(articleCategory: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {article_category_id: articleCategory}
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
            query: {region_id: region}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }

    async function getMultiByPeriod(period: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {period_id: period}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiByCountry(country: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {country_id: country}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiByPrefecture(prefecture: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {prefecture_id: prefecture}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getMultiBySourceCategory(sourceCategory: number): Promise<Ref<T[]>> {
        const { data, error } = await useFetch(uri, {
            query: {source_category_id: sourceCategory}
        });
        if (error.value) throw(error.value);
        return data as Ref<T[]>;
    }
    
    async function getByAuthor(authorId: number): Promise<Ref<T>> {
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
        getMultiByArticleCategory,
        getMultiByKana,
        getMultiByRegion,
        getMultiByPeriod,
        getMultiByCountry,
        getMultiByPrefecture,
        getMultiBySourceCategory,
        getByAuthor
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
        // await refreshNuxtData();
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
        // await refreshNuxtData();
        return res as T;
    }

    async function deleteById(id: number): Promise<T> {

        const res = await $fetch(uri, {
            method: 'delete',
            body: {id: id}
        });
        // await refreshNuxtData();
        return res as T;
    }

    return {
        post,
        update,
        deleteById
    };
}