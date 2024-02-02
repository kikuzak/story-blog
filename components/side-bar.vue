<template>
    <div class="side-bar">
        <ul class="index-category-list">
            <li class="index-category-item index">
                <p class="kana">索引</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?kana=${kana}`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item japan">
                <p class="label">日本</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?country=`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item region">
                <p class="label">世界(地域)</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item country">
                <p class="label">世界(国名)</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li clas="index-category-item period">
                <p class="label">時代</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item source_category">
                <p class="label">出典ジャンル</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
            <li class="index-category-item author">
                <p class="label">著者・編者</p>
                <ul>
                    <li v-for="kana in Conf.kana">
                        <nuxt-link :to="`search?`">{{ kana }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.side-bar {
    $side-bar-size: 70%;
    background-color: #FFF;
    block-size: 100%;
    inline-size: $side-bar-size;
    overflow: auto;
    transition: inset-block-start 200ms 0s ease;
}
</style>