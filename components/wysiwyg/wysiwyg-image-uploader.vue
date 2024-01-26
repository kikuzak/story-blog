<template>
    <div id="image-area">
        <div class="bg">

        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{isOpen: boolean}>();
const emits = defineEmits(['update:isOpen']);

watch(() => props.isOpen, (value) => {
    const areaEl = document.getElementById("image-area") as Element;
    if(value) {
        areaEl.addEventListener('mousedown', closeArea);
    } else {
        areaEl.removeEventListener('mousedown', closeArea);
    }
});

function closeArea() {
    emits('update:isOpen', false);
}
</script>

<style scoped lang="scss">
#image-area {
    background-color: rgba(0, 0, 0, .2);
    block-size: 100vh;
    inline-size: 100vw;
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 10000;
}

.bg {
    background-color: #fff;
    block-size: 80vh;
    border-radius: 1rem;
    inline-size: 80vw;
    margin: 10vh 10vw;
}
</style>