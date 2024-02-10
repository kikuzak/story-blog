<template>
    <NuxtLayout name="admin">
        <div class="top base-container">
            <h1>ダッシュボード</h1>
            <p><nuxt-link to="/" target="_blank">サイトTOPを開く</nuxt-link></p>
        </div>
    </NuxtLayout>
</template>

<script setup>
useHead({
    title: '物語収集サイト 管理ページ'
});
</script>