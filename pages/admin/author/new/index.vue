<template>
    <NuxtLayout name="admin">
        <div class="author-edit base-container">
            <h1>著者作成</h1>
            <div class="top-bar flex-container">
                <p>
                    <nuxt-link to="/admin/author"><i class="fa fa-angle-double-left" aria-hidden="true"></i></nuxt-link>
                </p>
                <p class="update-button" :class="[canUpdate()? 'active' : 'inactive']" @click="createAuthor()">作成</p>
            </div>
            <div class="content">
                <div class="content-row">
                    <div class="content-item name-area">
                        <p class="label">著者名</p>
                        <input type="text" class="text-box" :class="[validation.blank(author.name)? 'ok' : 'error']" v-model="author.name">
                    </div>
                    <div class="content-item kana-area">
                        <p class="label">かな</p>
                        <input type="text" class="text-box" :class="[validation.kana(author.kana)? 'ok' : 'error']" v-model="author.kana">
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const router = useRouter();
const toast = useToast();
let author: Ref<{id: number, name: string, kana: string}> = ref({id: 0, name: "", kana: ""});
const validation = useValidation();

function canUpdate() {
    if (validation.kana(author.value.kana) && validation.blank(author.value.name)) return true;
    else return false;
}

async function createAuthor() {
    if (!canUpdate()) return;
    try {
        let data = await AuthorLogic.post(author.value);
        toast.success('著者の作成に成功しました。');
        router.push('/admin/author');
    } catch (e) {
        toast.error('著者の作成に失敗しました。');
    }
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
    border-block-end: 2px solid $admin-sub-border-color;
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
    flex: 1;
    padding-block: 2rem;
    padding-inline: 1rem;
}

.content-item {
    margin-block-end: 2rem;
}

.content-row {
    display: flex;
    flex-flow: row;
    gap: 0 3rem;
    margin-block-end: 2rem;
}

.name-area {
    flex: 4;
}

.kana-area {
    flex: 1;
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
</style>