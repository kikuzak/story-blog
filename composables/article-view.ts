import { createReadMethods, createWriteMethods } from "./api-logic";

type ArticleView = {
    id: number,
    class_number: string | null,
    article_category_id: number | null
    article_category: {name: string | null},
    region_id: number | null,
    region: {name: string | null},
    country_id: number | null,
    country: {name: string | null},
    period_id: number | null,
    period: {name: string | null},
    prefecture_id: number | null,
    prefecture: {name: string | null},
    author_id: number | null
    author: {name: string | null},
    source_category_id: number | null,
    source_category: {name: string | null},
    source: string | null,
    title: string,
    kana: string,
    content: string | null,
    created_at: Date,
    updated_at: Date,
    published_at: Date | null,
    status: number
}

function initialize(): ArticleView {
    return {
        id: 0,
        class_number: null,
        article_category_id: null,
        article_category: {name: null},
        region_id: null,
        region: {name: null},
        country_id: null,
        country: {name: null},
        period_id: null,
        period: {name: null},
        prefecture_id: null,
        prefecture: {name: null},
        author_id: null,
        author: {name: null},
        source_category_id: null,
        source_category: {name: null},
        source: null,
        title: "",
        kana: "",
        content: null,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: null,
        status: 0
    }
}

async function getMultiByText(text: string) {
    const { data, error } = await useFetch('api/article', {
        query: {text: text, status: ArticleLogic.Status.published}
    });
    if (error.value) throw(error.value);
    return data as Ref<ArticleView[]>;
}

const {
    getById,
    getMultiByKana,
    getMultiByPrefecture,
    getMultiByCountry,
    getMultiByPeriod,
    getMultiByRegion,
    getMultiByArticleCategory
} = createReadMethods<ArticleView>('article-view');

const ArticleViewLogic = {
    initialize,
    getById,
    getMultiByKana,
    getMultiByPrefecture,
    getMultiByCountry,
    getMultiByPeriod,
    getMultiByRegion,
    getMultiByArticleCategory,
    getMultiByText
}

export { ArticleViewLogic };