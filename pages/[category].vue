<template>
    <NuxtLayout name="search">
        <div class="category">
            <h1>{{ articleCategory.name }}の一覧</h1>
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
            </ul>
            <p v-else>お探しの記事は見つかりませんでした。</p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const categoryKey = route.params.category as string;
const categoryId = Conf.getCategoryIdFromKey(categoryKey) as number;
const articleCategory = await ArticleCategoryLogic.getById(categoryId);
const articles = await ArticleViewLogic.getMultiByArticleCategory(categoryId);
</script>

<style scoped lang="scss">
.category {
    padding-block: 1rem;
    @include mq(pc) {
        padding: 0;
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
    flex-wrap: wrap;
    font-size: 0.7rem;

    .article-attribute-item {
        margin-inline-end: 0.7rem;
    }
}
</style>