<template>
    <div class="search">

    </div>
</template>

<script setup lang="ts">
const params = new URLSearchParams(window.location.search);
for (const [key, value] of params.entries()) {
  console.log(`${key}: ${value}`);
}
</script>