<template>
    <div class="category-button" :class="`category-${props.category}`">
        <picture :class="`icon-search`">
            <!-- <source srcset="~/assets/img/title_sp.png"> -->
            <img :src="imageDefault.default" :alt="props.category">
        </picture>
    </div>
</template>

<script setup lang="ts">
type Props = {
    category: string
}
const props = defineProps<Props>();
const route = useRoute();
let imageDefault: any = {};

// 画像のロード
const loadImage = async (target: string) => {
    try {
        imageDefault = await import(`~/assets/img/icon_category_${props.category}_search_${target}.png`);
    } catch(e) {
        console.error(e);
    }
}

await loadImage('sp');

onMounted(() => {
    const categoryKey = route.params.category as string;
    if (categoryKey !== props.category) return;
    const element = document.getElementsByClassName(`category-${props.category}`)[0] as HTMLElement;
    element.style.opacity = "1";
});

</script>

<style scoped lang="scss">
.category-button {
    block-size: 10vw;
    inline-size: 10vw; // 後で上書きする前提
    opacity: 0.7;
    position: relative;
    &:hover {
        cursor: pointer;
    }
}
</style>