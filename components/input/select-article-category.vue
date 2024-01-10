<template>
    <div class="select-category">
        <select name="article-category" @change="update">
            <option value="0">--</option>
            <option
                v-for="category in categories"
                :value="category.id"
                :selected="isSelected(category.id)"
            >{{ category.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{categoryId: number | null}>();
const emits = defineEmits<{
    (e: 'update:categoryId', val: number): void
}>();

const categories = await ArticleCategoryLogic.getAll();

function isSelected(id: number): boolean {
    if (!props.categoryId) return false;
    if (props.categoryId === id) return true;
    else return false;
}

const update = (event: Event) => {
    const element = event.target as HTMLInputElement;
    emits('update:categoryId', Number(element.value));
}
</script>

<style scoped lang="scss">
.select-category {
    position: relative;
    &:after {
        content: "\f0d7";
        font-family: 'Font Awesome 5 Free';
        font-weight: bold;
        inset-inline-end: 0.6rem;
        line-height: 2.4rem;
        position: absolute;
    }
}
</style>