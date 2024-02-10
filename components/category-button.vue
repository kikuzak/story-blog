<template>
    <div
        class="category-button"
        @mouseover="setHover(true)"
        @mouseleave="setHover(false)"
        @click="setHover(true)"
    >
        <picture :class="`icon-${props.page}`" v-show="!isActrive">
            <!-- <source srcset="~/assets/img/title_sp.png"> -->
            <img :src="imageDefault.default" :alt="props.category">
        </picture>
        <picture :class="`icon-${props.page}-hover`" v-show="isActrive">
            <!-- <source srcset="~/assets/img/title_sp.png"> -->
            <img :src="imageHover.default" :alt="props.category">
        </picture>
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
let imageDefault: any = {};
let imageHover: any = {};

// 画像のロード
const loadImage = async (target: string) => {
    try {
        imageDefault = await import(`~/assets/img/icon_category_${props.category}_${props.page}_${target}.png`);
        imageHover = await import(`~/assets/img/icon_category_${props.category}_hover_${target}.png`);
    } catch(e) {
        console.error(e);
    }
}

await loadImage('sp');

const setHover = (value: boolean) => {
    isActrive.value = value;
}

function resize() {
    if (window.innerWidth >= 1280) isActrive.value = false;
    else isActrive.value = true;
}

onMounted(() => {
    resize();
    window.removeEventListener('resize', resize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
});
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
</style>