<template>
    <NuxtLayout name="search">
        <div class="article-content">
            <header>
                <h1>{{ article.title }}</h1>
                <div class="article-attribute-list flex-container">
                    <p class="article-attribute-item" v-if="article.article_category">分類：{{ article.article_category.name }}</p>
                    <p class="article-attribute-item" v-if="article.class_number">分類番号：{{ article.class_number }}</p>
                    <p class="article-attribute-item" v-if="article.country">国：{{ article.country.name }}</p>
                    <p class="article-attribute-item" v-if="article.old_prefecture">旧国名：{{ article.old_prefecture.name }}</p>
                    <p class="article-attribute-item" v-if="article.prefecture">県：{{ article.prefecture.name }}</p>
                    <p class="article-attribute-item" v-if="article.period">時代：{{ article.period.name }}</p>
                </div>
            </header>
            <div class="article-text" v-html="article.content">
            </div>
        </div>

    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const id = Number(route.params.id);
const article = await ArticleViewLogic.getById(id);

const originalContent = article.value.content as string;
const plainContent = originalContent.replace(/<[^>]+>/g, '');
const headContent = plainContent.substring(0, 120);

useHead({
    title: `${article.value.title}`,
    link: [
        {rel: 'canonical', href: `${Conf.baseURL}/article/${article.value.id}`}
    ],
    meta: [
        {name: 'description', content:  headContent},
        {property: 'og:title', content: `${article.value.title}`},
        {property: 'og:description', content: headContent},
    ]
});

</script>

<style scoped lang="scss">
header {
    margin-block-end: 1rem;

    h1 {
        margin-block-end: 0.2rem;
    }
}
.article-content {
    padding-block: 1rem;
    @include mq(pc) {
        padding-block-start: 0;
    }
}

.article-text {
    padding-bottom: 1rem;
}

.article-attribute-list {
    justify-content: left;
    flex-wrap: wrap;
}

.article-attribute-item {
    font-size: 0.7rem;
    margin-block-end: 0;
    margin-inline-end: 1rem;
}
</style>
