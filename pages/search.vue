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
                            <li class="article-attribute-item" v-if="article.region">地域：{{ article.region.name }}</li>
                            <li class="article-attribute-item" v-if="article.period">時代：{{ article.period.name }}</li>
                            <li class="article-attribute-item" v-if="article.author">著者：</li>
                        </ul>
                    </nuxt-link>
                </li>
            </ul>
            <p v-else>お探しの記事は見つかりませんでした。</p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
let articles = ref([ArticleViewLogic.initialize()]);
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
});

const search = async (params: URLSearchParams) => {
    if (params.size > 1) throw new Error('あきまへん');
    for await (const [key, value] of params.entries()) {
        switch (key) {
            case 'country':
                if (!validation.id(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByCountry(Number(value));
                const country = await CountryLogic.getById(Number(value));
                headText.value = `「${country.value.name}」の検索結果`;
                break;
            case 'region':
                if (!validation.id(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByRegion(Number(value));
                const region = await RegionLogic.getById(Number(value));
                headText.value = `「${region.value.name}」の検索結果`;
                break;
            case 'period':
                if (!validation.id(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByPeriod(Number(value));
                const period = await PeriodLogic.getById(Number(value));
                headText.value = `「${period.value.name}」の検索結果`;
                break;
            case 'prefecture':
                if (!validation.id(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByPrefecture(Number(value));
                const prefecture = await PrefectureLogic.getById(Number(value));
                headText.value = `「${prefecture.value.name}」の検索結果`;
                break;
            case 'kana':
                if (!validation.kana(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByKana(value);
                headText.value = `「${value}」の検索結果`;
                break;
            case 'text':
                if (!validation.text(value)) throw new Error("だめ");
                articles = await ArticleViewLogic.getMultiByText(value);
                break;
        }
    }
}
</script>

<style scoped lang="scss">
.search-result {
    padding-block: 1rem;
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

    .article-attribute-item {
        margin-inline-end: 0.7rem;
    }
}
</style>