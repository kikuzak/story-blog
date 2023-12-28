<template>
    <h1>Admin</h1>
    <div v-if="data">
        <p>{{ data.id }}</p>
    </div>
</template>

<script setup lang="ts">
import { getById } from '@/composables/article-category';
const data  = await getById(1);

console.log(data.value);
</script>