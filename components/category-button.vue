<template>
    <div
        class="category-button"
        @mouseover="setHover(true)"
        @mouseleave="setHover(false)"
        @click="setHover(true)"
    >
        <NuxtImg
            :class="`icon-${props.page}`"
            v-show="!isActrive"
            :src="`icon_category_${props.category}_${props.page}.png`"
            sizes="md:200px xl:400px"
        />
        <NuxtImg
            v-show="isActrive"
            :src="`icon_category_${props.category}_hover.png`"
            sizes="md:200px xl:400px"
        />
    </div>
</template>

<script setup lang="ts">
type Props = {
    page: string,
    category: string
    isInitailActive: boolean
}
const props = defineProps<Props>();
const isActrive = ref(props.isInitailActive);

const setHover = (value: boolean) => {
    isActrive.value = value
}
</script>

<style scoped lang="scss">
.category-button {
    block-size: 10vw;
    inline-size: 10vw; // 後で上書きする前提
    position: relative;
    &:hover {
        cursor: pointer;
    }
}

.icon-search {
    $icon-size: 70%;
    inset-block-start: calc((100% - $icon-size) / 2);
    inset-inline-start: calc((100% - $icon-size) / 2);
    position: absolute;
    block-size: $icon-size;
    inline-size: $icon-size;
}
</style>