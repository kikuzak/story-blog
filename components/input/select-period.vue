<template>
    <div class="select-period">
        <select name="period" @change="update">
            <option value="0">--</option>
            <option
                v-for="period in periods"
                :value="period.id"
                :selected="isSelected(period.id)"
            >{{ period.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{periodId: number | null}>();
const emits = defineEmits<{
    (e: 'update:periodId', val: number): void
}>();

const periods = inject('periods', ref([PeriodLogic.initialize()]));

function isSelected(id: number): boolean {
    if (!props.periodId) return false;
    if (props.periodId === id) return true;
    else return false;
}

const update = (event: Event) => {
    const element = event.target as HTMLInputElement;
    emits('update:periodId', Number(element.value));
}
</script>

<style scoped lang="scss">
.select-period {
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