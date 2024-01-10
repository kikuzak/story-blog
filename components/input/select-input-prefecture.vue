<template>
    <input
        type="text"
        id="prefecture-input"
        class="text-box"
        v-model="inputText"
        :class="[isFocus? 'active' : 'inactive', canUpdate? 'ok' : 'error', enable? 'enable' : 'disable']"
        :disabled="!enable"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @input="canUpdate = false"
    >
    <ul class="input-select-list" v-show="isFocus">
        <li class="input-select-item" @mousedown="updateSelectedPrefecture(0); toggleFocus(false)">--</li>
        <li class="input-select-item"
            v-for="country in filteredCoutries"
            @mousedown="updateSelectedPrefecture(country.id); toggleFocus(false)"
        >{{ country.name}}</li>
    </ul>
</template>

<script setup lang="ts">

const props = defineProps<{prefectureId: number | null, countryId: number | null}>();
const emits = defineEmits<{
    (e: 'update:prefectureId', val: number): void
}>();

const prefectures = await PrefectureLogic.getAll();
const inputText = ref("");
const isFocus = ref(false);
const canUpdate = ref(true);
const enable = ref(false);

if (props.prefectureId) updateSelectedPrefecture(props.prefectureId);

// 国idを監視する
watch(() => props.countryId, () => {
    if (props.countryId === 123) {
        enable.value = true;
    } else {
        updateSelectedPrefecture(0);
        enable.value = false;
    }
});

// 選択中のカテゴリを変更する
function updateSelectedPrefecture(id: number): void {
    canUpdate.value = true;
    if (id === 0) {
        inputText.value = "";
        emits('update:prefectureId', id);
        return;
    }
    const index = prefectures.value.findIndex((v) => v.id === id);
    if (index < 0) throw ("InputSelectPrefecture: updateSelectedPrefecture");
    inputText.value = prefectures.value[index].name;
    emits('update:prefectureId', id);
}

function toggleFocus(value: boolean) {
    isFocus.value = value;
}

// カテゴリのリストを入力によりフィルターする
const filteredCoutries = computed(() => {
    if (!inputText.value.length) return prefectures.value;
    return prefectures.value.filter((v) => v.name.includes(inputText.value));
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