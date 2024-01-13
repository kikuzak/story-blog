<template>
    <div class="select-region">
        <select name="region" @change="update">
            <option value="0">--</option>
            <option
                v-for="region in regions"
                :value="region.id"
                :selected="isSelected(region.id)"
            >{{ region.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{regionId: number | null}>();
const emits = defineEmits<{
    (e: 'update:regionId', val: number): void
}>();

const regions = inject('regions', ref([RegionLogic.initialize()]));

function isSelected(id: number): boolean {
    if (!props.regionId) return false;
    if (props.regionId === id) return true;
    else return false;
}

const update = (event: Event) => {
    const element = event.target as HTMLInputElement;
    emits('update:regionId', Number(element.value));
}
</script>

<style scoped lang="scss">
.select-region {
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