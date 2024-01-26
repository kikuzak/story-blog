<template>
    <div id="link-area">
        <p class="bold">リンク</p>
        <input class="url-input" type="text" placeholder="URLを入力" v-model="linkInput">
        <div class="tab flex-container">
            <div id="switch-target" @click="toggleTarget"></div>
            <p>別タブで開く</p>
        </div>
        <button
            class="enter-button"
            @click="enterLink"
            :disabled="!validation.url(linkInput)"
            :class="[validation.url(linkInput) ? 'ok' : 'error']"
        >保存</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{isFocus: boolean}>();
const emits = defineEmits(['update:isFocus', 'emitLink']);
const linkInput = ref("");
const validation = useValidation();
let isFirstClick: boolean = true;
let isTargetBlank: boolean = false;

watch(() => props.isFocus, (value) => {
    if(value) {
        document.addEventListener('mousedown', setEvent);
    } else {
        document.removeEventListener('mousedown', setEvent);
        linkInput.value = "";
        // isFirstClick = true;
    }
});

function setEvent(e: Event): void {
    // if (isFirstClick) {
    //     isFirstClick = false;
    //     return;
    // }
    const target = e.target as HTMLElement;
    if (target.classList.contains('url-input')) {
        return;
    }
    if (!target.closest('#link-area')) {
        emits('update:isFocus', false);
    }
}

function enterLink() {
    emits('emitLink', linkInput.value, isTargetBlank);
    emits('update:isFocus', false);
}

function toggleTarget() {
    const target = document.getElementById('switch-target') as HTMLElement;
    if (target.classList.contains('active')) {
        target.classList.remove('active');
        isTargetBlank = false;
    } else {
        target.classList.add('active');
        isTargetBlank = true;
    }
}
</script>

<style scoped lang="scss">
#link-area {
    background-color: #FFF;
    block-size: 12rem;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    box-shadow: 0 0 10px $admin-shadow-color; 
    inline-size: 20rem;
    inset-inline-start: 0;
    inset-block-start: 1.2rem;
    padding: 0.6rem;
    position: absolute;
    z-index: 10;
}

.bold {
    font-weight: bold;
    margin-block-end: 1rem;
}

.url-input {
    block-size: 2.4rem;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    inline-size: 100%;
    line-height: 2.4rem;
    margin-block-end: 1rem;
    padding-inline-start: 0.4rem;
    &:focus {
        border-color: $admin-main-color;
    }
    &::placeholder {
        color: $admin-sub-text-hover-color;
    }
}
.tab { 
    justify-content: left;
    margin-block-end: 1rem;
    p {
        font-size: 0.8rem;
        margin-inline-start: 0.4rem;
    }
}

#switch-target {
    background-color: $admin-disabled-color;
    block-size: 1.4rem;
    border-radius: 10rem;
    inline-size: 3rem;
    position: relative;
    transition: all 200ms 0s ease;
    &:after {
        background-color: #FFF;
        block-size: 1rem;
        border-radius: 10rem;
        content: "";
        display: block;
        inline-size: 1rem;
        position: absolute;
        inset-block-start: 0.2rem;
        inset-inline-start: 0.2rem;
        transition: all 200ms 0s ease;
    }
    &.active {
        background-color: $admin-sub-color;
        &:after {
            inset-inline-start: 1.8rem;
        }
    }
}

.enter-button {
    background-color: #ff8f45;
    block-size: 2.4rem;
    border: none;
    border-radius: 4px;
    color: #FFF;
    inline-size: 6rem;
    text-align: center;
}

.error {
    opacity: 0.5;
}
</style>