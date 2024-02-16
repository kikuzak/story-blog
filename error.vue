<template>
    <NuxtLayout name="search">
        <div class="article-content">
            <p>お探しのページは見つかりませんでした。</p>
        </div>

    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    title: `MARINTO GOA | エラー`,
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
