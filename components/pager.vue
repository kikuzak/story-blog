<template>
    <div class="pager flex-container">
        <p class="current-num">{{ props.pageStartNum }}~{{ props.pageEndNum }}件目を表示中</p>
        <div class="current-page">
            <i
                class="fa fa-angle-left button"
                aria-hidden="true"
                v-show="!props.isFirstPage"
                @click="$emit('pagePrev')">
            </i>
            <p>{{ props.currentPage }} / {{ lastPage }}</p>
            <i
                class="fa fa-angle-right button"
                aria-hidden="true"
                v-show="!props.isLastPage"
                @click="$emit('pageNext')">
            </i>
        </div>
    </div>
</template>

<script setup lang="ts">
type Props = {
    count: number,
    currentPage: number
    numPerPage: number,
    pageStartNum: number,
    pageEndNum: number,
    isFirstPage: boolean,
    isLastPage: boolean
}
const props = defineProps<Props>();
const { lastPage } = usePager(props.numPerPage, props.count);

</script>

<style scoped lang="scss">
.pager {
    align-items: center;
    block-size: 3rem;

    .current-num {
        font-size: 0.8rem;
    }

    .current-page {
        align-items: center;
        display: flex;
        font-size: 1rem;
        font-weight: bold;

        .button {
            block-size: 1.4rem;
            border: 1px solid $admin-main-color;
            border-radius: 2px;
            color: $admin-main-color;
            inline-size: 1.4rem;
            line-height: 1.4rem;
            margin-inline: 1rem;
            text-align: center;
            &:hover {
                border-color: $admin-main-border-color;
                box-shadow: 2px 2px 2px $admin-sub-border-color;
                color: $admin-main-border-color;
            }
        }
    }
}
</style>