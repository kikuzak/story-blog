<template>
    <input
        type="text"
        id="country-input"
        class="text-box"
        autocomplete="off"
        v-model="inputText"
        :class="[isFocus? 'active' : 'inactive', canUpdate? 'ok' : 'error']"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        @input="canUpdate = false"
    >
    <ul class="input-select-list" v-show="isFocus">
        <li class="input-select-item" @mousedown="updateSelectedCountry(0); toggleFocus(false)">--</li>
        <li class="input-select-item"
            v-for="country in filteredCoutries"
            @mousedown="updateSelectedCountry(country.id); toggleFocus(false)"
        >{{ country.name}}</li>
    </ul>
</template>

<script setup lang="ts">

const props = defineProps<{countryId: number | null}>();
const emits = defineEmits<{
    (e: 'update:countryId', val: number): void
}>();

const countries = inject('countries', ref([CountryLogic.initialize()]));
const inputText = ref("");
const isFocus = ref(false);
const canUpdate = ref(true);

if (props.countryId) updateSelectedCountry(props.countryId);

// 選択中のカテゴリを変更する
function updateSelectedCountry(id: number): void {
    canUpdate.value = true;
    if (id === 0) {
        inputText.value = "";
        emits('update:countryId', id);
        return;
    }
    const index = countries.value.findIndex((v) => v.id === id);
    if (index < 0) throw ("InputSelectCoutnry: updateSelectedCountry");
    inputText.value = countries.value[index].name;
    emits('update:countryId', id);
}

function toggleFocus(value: boolean) {
    isFocus.value = value;
}

// カテゴリのリストを入力によりフィルターする
const filteredCoutries = computed(() => {
    if (!inputText.value.length) return countries.value;
    return countries.value.filter((v) => v.name.includes(inputText.value));
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