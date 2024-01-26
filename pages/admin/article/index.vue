<template>
    <NuxtLayout name="admin">
        <div class="article base-container">
            <h1>記事管理</h1>
            <div class="top-bar flex-container">
                <AdminSearchBox />
                <ul class="category-list">
                    <li class="category-item selected" @click="selectCategory('All')">All</li>
                    <li
                        class="category-item"
                        v-for="item in categories"
                        @click="selectCategory(item.name)"
                    >{{ item.name }}</li>
                </ul>
                <p class="add-button">
                    <nuxt-link to="/admin/article/new">追加</nuxt-link>
                </p>
            </div>
            <div class="content">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th class="checkbox-row">
                                    <input
                                        type="checkbox"
                                        class="checkbox"
                                        v-model="selectedAll"
                                        @change="checkAll"
                                    >
                                </th>
                                <th class="kana-row"><p>かな</p></th>
                                <th class="title-row"><p>タイトル</p></th>
                                <th class="status-row">ステータス</th>
                                <th class="edit-row">edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="article in articles" :key="article.id">
                                <td class="checkbox-row">
                                    <input
                                        type="checkbox"
                                        class="checkbox article-check"
                                        :value="article.id"
                                        v-model="selectedArticles"
                                    >
                                </td>
                                <td class="kana-row"><p>{{ article.kana }}</p></td>
                                <td class="title-row"><p>{{ article.title }}</p></td>
                                <td class="status-row article-status" ><div class="status-mark" :class="getStatusClass(article.status)"></div><p class="status">{{ getStatus(article.status) }}</p></td>
                                <td class="edit-row">
                                    <p class="edit-button" v-show="!isChecked()">
                                        <nuxt-link :to="`/admin/article/edit/${article.id}`">編集</nuxt-link>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pager-wrapper" v-show="!isChecked()">
                    <AdminPager
                        :count="articleCount"
                        :currentPage="pager.currentPage.value"
                        :numPerPage="pager.numberPerPage.value"
                        :pageStartNum="pager.pageStartNum()"
                        :pageEndNum="pager.pageEndNum()"
                        :isFirstPage="pager.isFirstPage()"
                        :isLastPage="pager.isLastPage()"
                        @pagePrev="pagePrev"
                        @pageNext="pageNext"
                    />
                </div>
                <div class="delete-wrapper flex-container" v-show="isChecked()">
                    <p>{{ selectedArticles.length }}件を選択中</p>
                    <div class="delete-button" @click="deleteArticle()">
                        <p>選択項目を削除</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

useHead({
    title: '物語収集サイト 記事管理'
});

// 初期化
const toast = useToast();
let articleCount = await pageNumCount('article');
const numPerPage = 15; // いったん固定値
let pager  = usePager(numPerPage, articleCount.value);
let articles = await ArticleLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
let categories = await ArticleCategoryLogic.getAll();

async function initialize() {
    articleCount = await pageNumCount('article');
    pager  = usePager(numPerPage, articleCount.value);
    articles  = await ArticleLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    selectedArticles.value = [];
}

// カテゴリー
function selectCategory(name: string) {
    let el = document.getElementsByClassName('category-item');
    for (let i = 0; i < el.length; i++) {
        if (el[i].innerHTML === name) el[i].classList.add('selected');
        else el[i].classList.remove('selected');
    }
}

// ステータスを設定
function getStatus(status: number) {
    switch (status) {
        case ArticleLogic.Status.Draft:
            return '下書き';
        case ArticleLogic.Status.reserved:
            return '投稿予約';
        case ArticleLogic.Status.published:
            return '公開済み';
    }
}

function getStatusClass(status: number) {
    switch (status) {
        case ArticleLogic.Status.Draft:
            return 'draft';
        case ArticleLogic.Status.reserved:
            return 'reserved';
        case ArticleLogic.Status.published:
            return 'published';
    }
}

// チェックボックス
const selectedArticles: Ref<number[]> = ref([]);
const selectedAll: Ref<boolean> = ref(false);

function isChecked(): boolean {
    if (selectedArticles.value.length > 0) return true;
    else return false;
}

function checkAll() {
    if (selectedAll.value) {
        let checks = document.getElementsByClassName('article-check');
        for (let i = 0; i < checks.length; i++) {
            let el = checks[i] as HTMLInputElement;
            el.checked = true;
            selectedArticles.value.push(Number(el.value));
        }
    } else {
        selectedArticles.value = [];
    }
}

async function deleteArticle() {
    let isDelete = window.confirm("本当に削除しますか？");
    if (!isDelete) return;

    try {
        const deletePromises = selectedArticles.value.map(selectedArticleId => ArticleLogic.deleteById(selectedArticleId));
        const deletedArticles = await Promise.all(deletePromises);
        toast.success('記事の削除に成功しました。');
        initialize();
    } catch (e) {
        toast.error('記事の削除に失敗しました。')
    }
}

// ページング
async function pagePrev() {
    pager.previous();
    const data = await ArticleLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    articles.value = data.value;
}

async function pageNext() {
    pager.next();
    const data = await ArticleLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    articles.value = data.value;
}
</script>

<style scoped lang="scss">
.article {
    block-size: 100%;
    display: flex;
    flex-flow: column;
}

.checkbox-row {
    flex: 2;
}

.kana-row {
    flex: 4;
}

.title-row {
    flex: 14;
}

.status-row {
    flex: 4;
}

.edit-row {
    flex: 2;
}

.category-list {
    display: flex;

    .category-item {
        block-size: 1.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        line-height: 1.8rem;
        padding-inline: 0.6rem;
        &:hover {
            background-color: $admin-sub-border-color;
        }
        &:not(:last-of-type) {
            margin-inline-end: 0.4rem;
        }
        
        &.selected {
            background-color: $admin-sub-color;
            color: $admin-sub-text-color;
        }
    }
}

.article-status {
    align-items: center;
    display: flex;

    .status-mark {
        block-size: 0.7rem;
        border-radius: 10rem;
        inline-size: 0.7rem;
        margin-inline-end: 0.4rem;
        &.draft {
            background-color: $draft-color;
        }
        &.reserved {
            background-color: $notification-color;
        }
        &.published {
            background-color: $safe-color;
        }
    }
}

// .status {
//     padding-inline-start: 1rem;
//     position: relative;
//     &:before {
//         content: "";
//         block-size: 0.7rem;
//         border: 1px solid $admin-main-border-color;
//         border-radius: 10rem;
//         display: block;
//         inline-size: 0.7rem;
//         inset-block-start: 1.1rem;
//         inset-inline-start: 0;
//         position: absolute;
//     }
// }
</style>