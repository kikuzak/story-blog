<template>
    <div class="side-bar" @click.stop>
        <ul class="index-category-list">
            <li class="index-category-item index">
                <p class="label kana" @click="toggleSearchList('index-list')">索引</p>
                <ul class="search-list index-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?kana=${kana}`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item prefecture">
                <p class="label">日本</p>
                <ul class="search-list prefecture-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?prefecture=`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item region">
                <p class="label">世界(地域)</p>
                <ul class="search-list region-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item country">
                <p class="label">世界(国名)</p>
                <ul class="search-list country-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item period">
                <p class="label">時代</p>
                <ul class="search-list period-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item source_category">
                <p class="label">出典ジャンル</p>
                <ul class="search-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item author">
                <p class="label">著者・編者</p>
                <ul class="search-list author-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
function toggleSearchList(className: string) {
    const listElement = document.getElementsByClassName(className)[0];
    if (listElement.classList.contains('active')) listElement.classList.remove('active');
    else listElement.classList.add('active');
}
</script>

<style scoped lang="scss">
.side-bar {
    $side-bar-size: 70%;
    background-color: #FFF;
    block-size: 100%;
    inline-size: $side-bar-size;
    overflow: auto;
    padding-block: 2rem;
    transition: inset-block-start 200ms 0s ease;
}

.index-category-item {
    font-size: 1rem;
    padding-inline-start: 2.4rem;
    position: relative;

    .label {
        &:before {
            block-size: 0.8rem;
            border: 1px solid $main-text-color;
            content: "+";
            display: inline-block;
            font-size: 0.8rem;
            inline-size: 0.8rem;
            inset-block-start: 0.3rem;
            inset-inline-start: 1rem;
            line-height: calc(0.8rem - 2px);
            margin-inline-end: 0.4rem;
            position: absolute;
            text-align: center;
        }
    }
}

.search-list {
    display: none;

    &.active {
        display: block;
    }
}
</style>