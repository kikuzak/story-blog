<template>
    <input
        type="text"
        id="author-input"
        class="text-box"
        autocomplete="off"
        v-model="inputText"
        :class="[isFocus? 'active' : 'inactive', canUpdate? 'ok' : 'error']"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @input="canUpdate = false"
    >
    <ul class="input-select-list" v-show="isFocus">
        <li class="input-select-item" @mousedown="updateSelectedAuthor(null); toggleFocus(false)">--</li>
        <li class="input-select-item"
            v-for="author in filteredAuthors"
            @mousedown="updateSelectedAuthor(author.id); toggleFocus(false)"
        >{{ author.name}}</li>
    </ul>
</template>

<script setup lang="ts">

const props = defineProps<{authorId: number | null}>();
const emits = defineEmits<{
    (e: 'update:authorId', val: number | null): void
}>();

const authors = inject('authors', ref([AuthorLogic.initialize()]));
const inputText = ref("");
const isFocus = ref(false);
const canUpdate = ref(true);

if (props.authorId) updateSelectedAuthor(props.authorId);

// 選択中のカテゴリを変更する
function updateSelectedAuthor(id: number | null): void {
    canUpdate.value = true;
    if (!id) {
        inputText.value = "";
        emits('update:authorId', id);
        return;
    }
    const index = authors.value.findIndex((v) => v.id === id);
    if (index < 0) throw ("InputSelectCoutnry: updateSelectedAuthor");
    inputText.value = authors.value[index].name;
    emits('update:authorId', id);
}

function toggleFocus(value: boolean) {
    isFocus.value = value;
}

// カテゴリのリストを入力によりフィルターする
const filteredAuthors = computed(() => {
    if (!inputText.value.length) return authors.value;
    return authors.value.filter((v) => v.name.includes(inputText.value));
});
</script>

<style scoped lang="scss">
input {
    block-size: 2.4rem;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    font-size: 1rem;
    line-height: 2.4rem;
    padding-inline: 0.6rem;
}

.input-select-list {
    box-shadow: 0 0 10px $admin-shadow-color;
    min-inline-size: 12rem;
    position: absolute;
    z-index: 10;
}
</style>