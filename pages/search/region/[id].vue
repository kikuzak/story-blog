<template>
    <NuxtLayout name="search">
        <div class="search-result">
            <h1>「{{ region.name }}」の検索結果</h1>
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
                    <template #complete><span></span></template>
                </InfiniteLoading>
            </ul>
            <p v-else>お探しの記事は見つかりませんでした。</p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const route = useRoute();
const id = Number(route.params.id);
const validation = useValidation();

const region = await CountryLogic.getById(id);
const articles: any = ref([ArticleViewLogic.initialize()]);
const numPerPage = 10;
let page = 1;

if (!validation.id(route.params.id as string)) throw new Error("不正な値です。");

const load = async ($state: any) => {
    try {
        const res = await ArticleViewLogic.getMutiByRegionAndPage(id, page, numPerPage);
        if (!res.value) {
            if (!articles.value[0].title) articles.value = null;
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