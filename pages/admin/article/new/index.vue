<template>
    <NuxtLayout name="admin">
        <div class="article-edit base-container">
            <h1>記事作成</h1>
            <div class="top-bar flex-container">
                <p>
                    <nuxt-link to="/admin/article"><i class="fa fa-angle-double-left" aria-hidden="true"></i></nuxt-link>
                </p>
                <div class="flex-container button-area">
                    <p class="draft-button" :class="[canUpdate()? 'active' : 'inactive']" @click="createArticle(false)">下書きとして保存</p>
                    <p class="update-button" :class="[canUpdate()? 'active' : 'inactive']" @click="createArticle(true)">作成</p>
                </div>
            </div>
            <div class="content">
                <div class="content-row">
                    <div class="content-item title-area" >
                        <p class="label">タイトル</p>
                        <input type="text" :class="[validation.blank(article.title)? 'ok' : 'error']" v-model="article.title">
                    </div>
                    <div class="content-item kana-area" >
                        <p class="label">タイトル検索用かな</p>
                        <input type="text" :class="[validation.kana(article.kana)? 'ok' : 'error']" v-model="article.kana">
                    </div>
                    
                </div>
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
                    <div class="content-item class-number-area">
                        <p class="label">分類番号</p>
                        <input type="text" v-model="article.class_number">
                    </div>
                    <div class="content-item author-area">
                        <p class="label">著者名</p>
                        <InputSelectAuthor v-model:author-id="article.author_id"/>
                    </div>
                    <div class="content-item source-category-area">
                        <p class="label">出典カテゴリ</p>
                        <InputSelectSourceCategory v-model:sourceCategoryId="article.source_category_id"/>
                    </div>
                    <div class="content-item source-area">
                        <p class="label">出典</p>
                        <input type="text" v-model="article.source" :class="[isSourceEnable() ? 'enable' : 'disable']" :disabled="!isSourceEnable()">
                    </div>
                </div>
                <div class="content-row">
                    <div class="content-item published-at-area">
                        <p class="label">公開日時</p>
                        <input type="text" id="flatpickr" v-model="publishDateString">
                    </div>
                </div>
                <div class="content-row content-area">
                    <p class="label">本文</p>
                    <Wysiwyg v-model:content="article.content"/>
                </div>
                <div class="content-row content-area">
                    <p class="preview-button" @click="preview">プレビュー</p>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const router = useRouter();
const toast = useToast();
const validation = useValidation();

const article = ref(ArticleLogic.initialize());
const publishDateString = ref<string>('');
if (article.value.published_at) publishDateString.value = stringifyDate(article.value.published_at);

// 必要なデータ類の取得
const articleCategories = await ArticleCategoryLogic.getAll();
const regions = await RegionLogic.getAll();
const countries = await CountryLogic.getAll();
const prefectures = await PrefectureLogic.getAll();
const periods = await PeriodLogic.getAll();
const authors = await AuthorLogic.getAll();
const sourceCategories = await SourceCategoryLogic.getAll();
provide('articleCategories', articleCategories);
provide('regions', regions);
provide('countries', countries);
provide('prefectures', prefectures);
provide('periods', periods);
provide('authors', authors);
provide('sourceCategories', sourceCategories);


onMounted(() => {
    flatpickr('#flatpickr', {
        enableTime: true,
        minuteIncrement: 30,
    });
});

const isSourceEnable = () => {
    if (article.value.source_category_id) return true;
    else return false;
}

function stringifyDate(date: Date): string {
    const dateObject = new Date(article.value.published_at as Date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1する
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hour = String(dateObject.getHours()).padStart(2, '0');
    const minute = String(dateObject.getMinutes()).padStart(2, '0');

    const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDateString;
}

const canUpdate = () => {
    if (
        validation.kana(article.value.kana) &&
        validation.blank(article.value.title)
    ) return true;
    else return false;
}

async function createArticle(isPublish: boolean) {
    if (!canUpdate()) return;
    if (publishDateString.value) article.value.published_at = new Date(publishDateString.value);
    const now = new Date();
    if (isPublish) {
        if (!article.value.published_at || article.value.published_at < now) {
            let confirm = window.confirm('記事が今すぐ公開されます。よろしいですか？');
            if (!confirm) return;
            article.value.published_at = now;
            article.value.status = ArticleLogic.Status.published;
        } else {
            article.value.status = ArticleLogic.Status.reserved;
        }
    } else {
        article.value.status = ArticleLogic.Status.Draft;
    }
    article.value.created_at = now;
    article.value.updated_at = now;

    let data = await ArticleLogic.post(article.value);

    toast.success('記事の更新に成功しました。');
    router.push('/admin/article');
}

function preview() {
    localStorage.setItem('edit-article', JSON.stringify(article.value));
    window.open('/admin/article/preview', 'target=_new');
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

    .draft-button {
        background-color: $draft-color;
        block-size: 2.4rem;
        border-radius: 4px;
        color: $admin-sub-text-color;
        inline-size: 10rem;
        margin-inline-end: 1rem;
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

.preview-button {
    background-color: $notification-color;
    block-size: 2.4rem;
    border-radius: 4px;
    color: $admin-sub-text-color;
    line-height: 2.4rem;
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

.title-area {
    flex: 4;
}

.kana-area {
    flex: 1;
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

.class-number-area {
    flex: 1;
}

.author-area {
    flex: 1.6;
}

.source-category-area {
    flex: 1;
}

.source-area {
    flex: 1.6;
}

.published-at-area {
    inline-size: 20rem;
}


.content-area {
    display: block;
}
</style>