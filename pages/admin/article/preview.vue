<template>
    <NuxtLayout name="preview">
        <div class="article-content">
            <header>
                <h1>{{ article.title }}</h1>
                <div class="article-attribute-list flex-container">
                    <p class="article-attribute-item" v-if="article.article_category">分類：{{ article.article_category.name }}</p>
                    <p class="article-attribute-item" v-if="article.class_number">分類番号：{{ article.class_number }}</p>
                    <p class="article-attribute-item" v-if="article.region">地域：{{ article.region.name }}</p>
                    <p class="article-attribute-item" v-if="article.period">時代：{{ article.period.name }}</p>
                    <p class="article-attribute-item" v-if="article.author">著者：</p>
                </div>
            </header>
            <div class="article-text" v-html="article.content">
            </div>
        </div>

    </NuxtLayout>
</template>

<script setup lang="ts">
const article = ref(ArticleViewLogic.initialize());

onMounted(async () => {
    const previewArticleStr: string = localStorage.getItem('edit-article') as string;
    const previewArticle = JSON.parse(previewArticleStr);
    article.value.title = previewArticle.title;
    article.value.content = previewArticle.content;
});

</script>

<style scoped lang="scss">
header {
    margin-block-end: 1rem;

    h1 {
        // font-size: 1.2rem;
        margin-block-end: 0.2rem;
    }
}
.article-content {
    padding-block: 1rem;
}

.article-text {
    padding-bottom: 1rem;
}

.article-attribute-list {
    justify-content: left;
}

.article-attribute-item {
    font-size: 0.7rem;
    margin-inline-end: 1rem;
}
</style>
