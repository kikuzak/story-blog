<template>
    <NuxtLayout name="search">
        <div class="search-result">
            <h1>{{ headText() }}</h1>
            <ul class="article-list">
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
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
let articles = ref([ArticleViewLogic.initialize()]);

// onMounted(async () => {
    const validation = useValidation();
    if (process.client) {
        const params = new URLSearchParams(window.location.search);
        if (params.size > 1) throw new Error('あきまへん');
        console.log(params);
        for (const [key, value] of params.entries()) {
            console.log(key + " : " + value);
            switch (key) {
                case 'country':
                if (!validation.id(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByCountry(Number(value));
                    break;
                case 'region':
                if (!validation.id(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByRegion(Number(value));
                    break;
                case 'period':
                if (!validation.id(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByPeriod(Number(value));
                    break;
                case 'prefecture':
                if (!validation.id(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByPrefecture(Number(value));
                    break;
                case 'kana':
                    if (!validation.kana(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByKana(value);
                    break;
                case 'text':
                    if (!validation.text(value)) throw new Error("だめ");
                    articles = await ArticleViewLogic.getMultiByText(value);
                    break
            }
        }
    }
// });

function headText() {
    return "";
}
</script>

<style scoped lang="scss">
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