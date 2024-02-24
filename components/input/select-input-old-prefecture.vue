<template>
    <input
        type="text"
        id="old-prefecture-input"
        class="text-box"
        autocomplete="off"
        v-model="inputText"
        :class="[isFocus? 'active' : 'inactive', canUpdate? 'ok' : 'error', enable? 'enable' : 'disable']"
        :disabled="!enable"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @input="canUpdate = false"
    >
    <ul class="input-select-list" v-show="isFocus">
        <li class="input-select-item" @mousedown="updateSelectedOldPrefecture(null); toggleFocus(false)">--</li>
        <li class="input-select-item"
            v-for="country in filteredCoutries"
            @mousedown="updateSelectedOldPrefecture(country.id); toggleFocus(false)"
        >{{ country.name}}</li>
    </ul>
</template>

<script setup lang="ts">

const props = defineProps<{oldPrefectureId: number | null, countryId: number | null}>();
const emits = defineEmits<{
    (e: 'update:oldPrefectureId', val: number | null): void
}>();

const oldPrefectures = inject('oldPrefectures', ref([OldPrefectureLogic.initialize()]));
const inputText = ref("");
const isFocus = ref(false);
const canUpdate = ref(true);
const enable = ref(false);

if (props.oldPrefectureId) updateSelectedOldPrefecture(props.oldPrefectureId);

// 国idを監視する
watch(() => props.countryId, () => {
    if (props.countryId === 123) {
        enable.value = true;
    } else {
        updateSelectedOldPrefecture(null);
        enable.value = false;
    }
});

// 選択中のカテゴリを変更する
function updateSelectedOldPrefecture(id: number | null): void {
    canUpdate.value = true;
    if (!id) {
        inputText.value = "";
        emits('update:oldPrefectureId', id);
        return;
    }
    const index = oldPrefectures.value.findIndex((v) => v.id === id);
    if (index < 0) throw ("InputSelectPrefecture: updateSelectedOldPrefecture");
    inputText.value = oldPrefectures.value[index].name;
    emits('update:oldPrefectureId', id);
}

function toggleFocus(value: boolean) {
    isFocus.value = value;
}

// カテゴリのリストを入力によりフィルターする
const filteredCoutries = computed(() => {
    if (!inputText.value.length) return oldPrefectures.value;
    return oldPrefectures.value.filter((v) => v.name.includes(inputText.value));
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