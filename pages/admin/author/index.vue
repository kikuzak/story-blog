<template>
    <NuxtLayout name="admin">
        <div class="author base-container">
            <h1>著者管理</h1>
            <div class="top-bar flex-container">
                <AdminSearchBox />
                <p class="add-button" v-show="!isChecked()">
                    <nuxt-link to="/admin/author/new">追加</nuxt-link>
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
                                <th class="name-row"><p>著者名</p></th>
                                <th class="edit-row">edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="author in authors" :key="author.id">
                                <td class="checkbox-row">
                                    <input
                                        type="checkbox"
                                        class="checkbox author-check"
                                        :value="author.id"
                                        v-model="selectedAuthors"
                                    >
                                </td>
                                <td class="kana-row"><p>{{ author.kana }}</p></td>
                                <td class="name-row"><p>{{ author.name }}</p></td>
                                <td class="edit-row">
                                    <p class="edit-button" v-show="!isChecked()">
                                        <nuxt-link :to="`/admin/author/edit/${author.id}`">編集</nuxt-link>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pager-wrapper" v-show="!isChecked()">
                    <AdminPager
                        :count="authorCount"
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
                    <p>{{ selectedAuthors.length }}件を選択中</p>
                    <div class="delete-button" @click="deleteAuthor()">
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
    title: '物語収集サイト 著者管理'
});

// 初期化
const toast = useToast();
let authorCount = await pageNumCount('author');
const numPerPage = 15; // いったん固定値
let pager  = usePager(numPerPage, authorCount.value);
let authors  = await AuthorLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value)

async function initialize() {
    authorCount = await pageNumCount('author');
    pager  = usePager(numPerPage, authorCount.value);
    authors  = await AuthorLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    selectedAuthors.value = [];
}

// チェックボックス
const selectedAuthors: Ref<number[]> = ref([]);
const selectedAll: Ref<boolean> = ref(false);

function isChecked(): boolean {
    if (selectedAuthors.value.length > 0) return true;
    else return false;
}

function checkAll() {
    if (selectedAll.value) {
        let checks = document.getElementsByClassName('author-check');
        for (let i = 0; i < checks.length; i++) {
            let el = checks[i] as HTMLInputElement;
            el.checked = true;
            selectedAuthors.value.push(Number(el.value));
        }
    } else {
        selectedAuthors.value = [];
    }
}

async function deleteAuthor() {
    let isDelete = window.confirm("本当に削除しますか？");
    if (!isDelete) return;

    try {
        const deletePromises = selectedAuthors.value.map(selectedAuthorId => AuthorLogic.deleteById(selectedAuthorId));
        const deletedAuthors = await Promise.all(deletePromises);
        toast.success('著者の削除に成功しました。');
        initialize();
    } catch (e) {
        toast.error('著者の削除に失敗しました。')
    }
}

// ページング
async function pagePrev() {
    pager.previous();
    const data = await AuthorLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    authors.value = data.value;
}

async function pageNext() {
    pager.next();
    const data = await AuthorLogic.getMultiByPage(pager.currentPage.value, pager.numberPerPage.value);
    authors.value = data.value;
}
</script>


<style scoped lang="scss">
.author {
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

.name-row {
    flex: 10;
}

.edit-row {
    flex: 1;
}
</style>