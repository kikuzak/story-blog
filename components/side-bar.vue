<template>
    <div class="side-bar" @click.stop>
        <ul class="index-category-list">
            <li class="index-category-item index">
                <p class="label kana" @click="toggleSearchList('index-list')">索引</p>
                <ul class="search-list index-list">
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`/search?kana=${kana}`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item prefecture" v-show="prefectures">
                <p class="label" @click="toggleSearchList('prefecture-list')">日本</p>
                <ul class="search-list prefecture-list">
                    <li v-for="prefecture in prefectures" :key="prefecture.id">
                        <nuxt-link :to="`/search?prefecture=${prefecture.id}`">{{ prefecture.name }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item region" v-show="regions">
                <p class="label" @click="toggleSearchList('region-list')">世界(地域)</p>
                <ul class="search-list region-list">
                    <li v-for="region in regions" :key="region.id">
                        <nuxt-link :to="`/search?region=${region.id}`">{{ region.name }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item country" v-show="countries">
                <p class="label" @click="toggleSearchList('country-list')">世界(国名)</p>
                <ul class="search-list country-list">
                    <li v-for="country in countries" :key="country.id">
                        <nuxt-link :to="`/search?country=${country.id}`">{{ country.name }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item period" v-show="periods">
                <p class="label" @click="toggleSearchList('period-list')">時代</p>
                <ul class="search-list period-list">
                    <li v-for="period in periods" :key="period.id">
                        <nuxt-link :to="`/search?period=${period.id}`">{{ period.name }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const regions = await RegionLogic.getPosted();
const countries = await CountryLogic.getPosted();
const prefectures = await PrefectureLogic.getPosted();
const periods = await PeriodLogic.getPosted();

function toggleSearchList(className: string) {
    const listElement = document.getElementsByClassName(className)[0];
    if (listElement.classList.contains('active')) listElement.classList.remove('active');
    else listElement.classList.add('active');
}
</script>

<style scoped lang="scss">
.side-bar {
    $side-bar-size: 70%;
    background-image: url('@/assets/img/sidebar_bg.png');
    background-size: cover;
    block-size: 100%;
    inline-size: $side-bar-size;
    overflow: auto;
    padding-block: 2rem;
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