<template>
    <div class="search-box">
        <input type="text">
    </div>
</template>

<style scoped lang="scss">
.search-box {
    background-color: #DDD;
    border-radius: 4px;
    block-size: 2.4rem;
    inline-size: 14rem;
    &:before {
        content: "\f002";
        font-family: 'Font Awesome 5 Free';
        font-size: 1rem;
        font-weight: 900;
        line-height: 2.4rem;
        padding-inline: 0.4rem;
        position: absolute;
    }
    &:hover {
        box-shadow: 2px 2px 2px $admin-sub-border-color;
    }
    input {
        block-size: 2.4rem;
        inline-size: 14rem;
        padding-inline-start: 2rem;
        &:focus {
            border: 1px solid $admin-sub-color;
            border-radius: 4px;
        }
    }
}
</style>