<template>
    <NuxtLayout name="admin">
        <div class="article-edit base-container">
            <h1>記事作成</h1>
            <div class="top-bar flex-container">
                <p>
                    <nuxt-link to="/admin/article"><i class="fa fa-angle-double-left" aria-hidden="true"></i></nuxt-link>
                </p>
                <p class="update-button" :class="[canUpdate()? 'active' : 'inactive']" @click="createArticle">作成</p>
            </div>
            <div class="content">
                <div class="content-row">
                    <div class="content-item category-area">
                        <p class="label">カテゴリー</p>
                        <InputSelectArticleCategory v-model:categoryId="article.article_category_id" />
                    </div>
                    <div class="content-item region-area">
                        <p class="label">地域</p>
                        <InputSelectRegion v-model:regionId="article.region_id" />
                    </div>
                    <div class="content-item country-area">
                        <p class="label">国</p>
                        <InputSelectCountry v-model:countryId="article.country_id" />
                    </div>
                    <div class="content-item prefecture-area">
                        <p class="label">県</p>
                        <InputSelectInputPrefecture v-model:prefectureId="article.prefecture_id" v-model:countryId="article.country_id" />
                    </div>
                    <div class="content-item period-area">
                        <p class="label">時代</p>
                        <InputSelectPeriod v-model:periodId="article.period_id" />
                    </div>
                </div>
                <div class="content-row">
                    <div class="content-item title-area" >
                        <p class="label">タイトル</p>
                        <input type="text" :class="[validation.blank(article.title)? 'ok' : 'error']" v-model="article.title">
                    </div>
                    <div class="content-item class-number-area">
                        <p class="label">分類番号</p>
                        <input type="text" v-model="article.class_number">
                    </div>
                </div>
                <div class="content-row content-area">
                    <p class="label">本文</p>
                    <Wysiwyg v-model:content="article.content"/>
                </div>
                <!-- <div class="content-row">
                    <div class="content-item name-area">
                        <p class="label">著者名</p>
                        <input type="text" class="text-box" :class="[validation.blank(author.name)? 'ok' : 'error']" v-model="author.name">
                    </div>
                    <div class="content-item kana-area">
                        <p class="label">かな</p>
                        <input type="text" class="text-box" :class="[validation.kana(author.kana)? 'ok' : 'error']" v-model="author.kana">
                    </div>
                </div> -->
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();
const validation = useValidation();

const article = ref(ArticleLogic.initialize());

const canUpdate = () => {
    return true;
    // if (validation.kana(author.value.kana)) return true;
    // else return false;
}

function createArticle() {
    
}

</script>

<style scoped lang="scss">
.author-edit {
    block-size: 100%;
    display: flex;
    flex-flow: column;
}
h1 {
    flex: 0 0 auto;
    margin-block-end: 1rem;
}

.top-bar {
    border-block-end: 2px solid $admin-main-border-color;
    flex: 0 0 auto;
    inline-size: 100%;
    padding-block: 0.4rem 1rem;

    p {
        block-size: 2.4rem;
        line-height: 2.4rem;
    }

    .update-button {
        background-color: $notification-color;
        block-size: 2.4rem;
        border-radius: 4px;
        color: $admin-sub-text-color;
        inline-size: 6rem;
        text-align: center;
        &.active {
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
        &.inactive {
            opacity: 0.4;
        }
    }
}

.content {
    padding-block: 2rem;
    padding-inline: 1rem;
}

.content-row {
    display: flex;
    flex-flow: row;
    gap: 0 3rem;
    margin-block-end: 2rem;
}

.label {
    font-size: 1.1rem;
    font-weight: bold;
    margin-block-end: 0.6rem;
}

.text-box {
    block-size: 2.4rem;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    font-size: 1rem;
    padding-inline-start: 0.6rem;
    inline-size: 100%;
    &:focus {
        border-color: $admin-main-color;
    }
    &.error {
        border-color: $alert-color;
    }
}

.category-area {
    flex: 1;
}

.region-area {
    flex: 1;
}

.country-area {
    flex: 1;
}

.period-area {
    flex: 1;
}

.prefecture-area {
    flex: 1;
}

.name-area {
    flex: 4;
}

.kana-area {
    flex: 1;
}

.title-area {
    flex: 3;
}

.class-number-area {
    flex: 1;
}

.content-area {
    display: block;
}
</style>