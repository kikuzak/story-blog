<template>
    <NuxtLayout name="search">
        <div class="search-result">
            <h1>{{ headText }}</h1>
            <ul class="article-list" v-if="articles">
                <li class="article-item" v-for="article in articles" :key="article.id">
                    <nuxt-link :to="`/article/${article.id}`">
                        <p class="title">{{ article.title }}</p>
                        <ul class="article-attribute-list">
                            <li class="article-attribute-item" v-if="article.article_category">分類：{{ article.article_category.name }}</li>
                            <li class="article-attribute-item" v-if="article.class_number">分類番号：{{ article.class_number }}</li>
                            <li class="article-attribute-item" v-if="article.country">国：{{ article.country.name }}</li>
                            <li class="article-attribute-item" v-if="article.prefecture">県：{{ article.prefecture.name }}</li>
                            <li class="article-attribute-item" v-if="article.period">時代：{{ article.period.name }}</li>
                        </ul>
                    </nuxt-link>
                </li>
                <InfiniteLoading @infinite="load">
                    <template #complete><span></span></template>>
                </InfiniteLoading>
            </ul>
            <p v-else>お探しの記事は見つかりませんでした。</p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

let articles: any = ref([ArticleViewLogic.initialize()]);
const numPerPage = 10;
let page = 1;

const headText = ref("");
const validation = useValidation();

onMounted(async () =>{
    const params = new URLSearchParams(window.location.search);
    await search(params);
});
onBeforeRouteUpdate(async (newRoute) => {
    const queryString = newRoute.fullPath.substring(newRoute.fullPath.indexOf("?"));
    const params = new URLSearchParams(queryString);
    await search(params);
    articles = ref([ArticleViewLogic.initialize()]);
    // getLogic(searchParam, page, numPerPage);
    const state = {
        complete: () => {
            console.log('Custom complete function');
        },
        loaded: () => {
            console.log('Custom loaded function');
        },
        error: () => {
            console.log('Custom error function');
        }
    };
    load(state);
});

let getLogic: any;
let searchParam: any;

const search = async (params: URLSearchParams) => {
    if (params.size > 1) throw new Error('あきまへん');
    for await (const [key, value] of params.entries()) {
        switch (key) {
            case 'country':
                if (!validation.id(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByCountryAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByCountry(Number(value));
                const country = await CountryLogic.getById(Number(value));
                headText.value = `「${country.value.name}」の検索結果`;
                break;
            case 'region':
                if (!validation.id(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByRegionAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByRegion(Number(value));
                const region = await RegionLogic.getById(Number(value));
                headText.value = `「${region.value.name}」の検索結果`;
                break;
            case 'period':
                if (!validation.id(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByPeriodAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByPeriod(Number(value));
                const period = await PeriodLogic.getById(Number(value));
                headText.value = `「${period.value.name}」の検索結果`;
                break;
            case 'prefecture':
                if (!validation.id(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByPrefectureAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByPrefecture(Number(value));
                const prefecture = await PrefectureLogic.getById(Number(value));
                headText.value = `「${prefecture.value.name}」の検索結果`;
                break;
            case 'kana':
                if (!validation.kana(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByKanaAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByKana(value);
                headText.value = `「${value}」の検索結果`;
                break;
            case 'text':
                if (!validation.text(value)) throw new Error("だめ");
                getLogic = ArticleViewLogic.getMutiByTextAndPage;
                searchParam = Number(value);
                // articles = await ArticleViewLogic.getMultiByText(value);
                headText.value = `「${value}」の検索結果`;
                break;
        }
    }
}

const load = async ($state: any) => {
    try {
        const res = await getLogic(searchParam, page, numPerPage);
        // console.log(res);
        if (!res.value) {
            if (!articles.value[0].title) articles = ref(null);
            console.log($state);
            $state.complete();
            return;
        }
        if (page === 1) articles.value = res.value;
        else articles.value.push(...res.value);
        page++;
        
        if (res.value.length < numPerPage) $state.complete();
        else $state.loaded();
    } catch(e) {
        $state.error();
        console.error(e);
    }
}
</script>

<style scoped lang="scss">
.search-result {
    padding-block: 1rem;
    @include mq(pc) {
        padding-block-start: 0;
    }
}

h1 {
    background-color: $main-color;
    color: #FFF;
    font-size: 0.7rem;
    font-weight: normal;
    line-height: 1.5rem;
    margin-block-end: 1rem;;
    padding-inline-start: 0.5rem;
}

.article-item {
    border-block-end: 1px solid $sub-text-color;
    margin-block-end: 0.7rem;
    padding-block-end: 0.7rem;
}

.title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-block-end: 0.2rem;
}

.article-attribute-list {
    display: flex;
    font-size: 0.7rem;
    flex-wrap: wrap;

    .article-attribute-item {
        margin-inline-end: 0.7rem;
    }
}
</style>