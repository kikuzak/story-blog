<template>
    <form action="search" method="get">
        <div class="search-box">
            <input class="search-text" type="text" placeholder="フリーワード検索">
            <button class="search-button" type="submit">
                <i class="fa fa-regular fa-magnifying-glass"></i>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.search-box {
    block-size: 2rem;
    border: 2px solid $search-box-color;
    inline-size: 100%;
    position: relative;

    .search-text {
        line-height: calc(2rem - 4px);
        padding-inline-start: 0.2rem;
        &::placeholder {
            color: $sub-text-color;
            font-size: 0.8rem;
        }
    }

    .search-button {
        background-color: $search-box-color;
        block-size: 2rem;
        color: #FFF;
        font-family: 'Font Awesome 5 Free';
        font-size: 1rem;
        inline-size: 2rem;
        inset-block-start: -2px;
        inset-inline-end: -2px;
        position: absolute;
        &:before {
            block-size: 2rem;
            content: "\f002";
            font-family: 'Font Awesome 5 Free';
            font-size: 1rem;
            font-weight: 900;
            inline-size: 2rem;
            line-height: 2rem;
            padding-inline-start: 0.5rem;
        }
    }
}
</style>