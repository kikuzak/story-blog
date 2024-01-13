<template>
    <div class="select-source-category">
        <select name="source-category" @change="update">
            <option value="0">--</option>
            <option
                v-for="category in sourceCategories"
                :value="category.id"
                :selected="isSelected(category.id)"
            >{{ category.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{sourceCategoryId: number | null}>();
const emits = defineEmits<{
    (e: 'update:sourceCategoryId', val: number): void
}>();

const sourceCategories = inject('sourceCategories', ref([SourceCategoryLogic.initialize()]));

function isSelected(id: number): boolean {
    if (!props.sourceCategoryId) return false;
    if (props.sourceCategoryId === id) return true;
    else return false;
}

const update = (event: Event) => {
    const element = event.target as HTMLInputElement;
    emits('update:sourceCategoryId', Number(element.value));
}
</script>

<style scoped lang="scss">
.select-source-category {
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