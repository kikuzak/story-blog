<template>
    <NuxtLayout name="default">
        <div class="top">
            <div class="base-container">
                <h1>
                    <picture>
                        <source srcset="~/assets/img/title_sp.png">
                        <img src="~/assets/img/title_sp.png" alt="MARINTO GOA">
                    </picture>
                </h1>
                <div class="text-area">
                    <p class="text-1">
                        <picture>
                            <source srcset="~/assets/img/title_text_1_sp.png">
                            <img src="~/assets/img/title_text_1_sp.png" alt="マリントゴアには管理者の蒐集した物語が">
                        </picture>
                    </p>
                    <p class="text-2">
                        <picture>
                            <source srcset="~/assets/img/title_text_2_sp.png">
                            <img src="~/assets/img/title_text_2_sp.png" alt="記録されていきます。">
                        </picture>
                    </p>
                </div>
                <div class="category-area">
                    <div v-for="(group, index) in categoryGroup" :key="index" class="category-group flex-container">
                        <CategoryButton
                            v-for="(category, innerIndex) in group"
                            :key="innerIndex"
                            :page="'top'"
                            :category="category"
                            :isInitailActive="true"
                            @click="linkTo(category)"
                        />
                    </div>
                </div>
                
            </div>
        </div>
    </NuxtLayout>
    
</template>

<script setup lang="ts">
useHead({
    title: 'MARINTO GOA | 世界中の物語を集めるブログ',
    link: [
        {rel: 'canonical', href: `${Conf.baseURL}`}
    ],
    meta: [
        {name: 'description', content: 'マリンとゴアには、管理人の蒐集した世界中の民話や神話、都市伝説といったさまざまな物語が記録されていきます。'},
        {property: 'og:title', content: 'MARINTO GOA | 世界中の物語を集めるブログ'},
        {property: 'og:description', content: 'マリンとゴアには、管理人の蒐集した世界中の民話や神話、都市伝説といったさまざまな物語が記録されていきます。'},
    ]
});

const router = useRouter();
const categoryKeys = Conf.getCategoryKeys();
const categoryGroup = computed(() => {
    // 配列を2・1・2に分割する
    return [
        categoryKeys.slice(0, 2),
        categoryKeys.slice(2, 3),
        categoryKeys.slice(3, 5),
    ];
});

const linkTo = (category: string) => {
    router.push(`/${category}`);
}

let topElement: HTMLElement;
let buttonElements: HTMLCollectionOf<HTMLElement>;

// windowの高さを調節する
function resize() {
    topElement.style.blockSize = `${window.innerHeight}px`;
}

// ボタン配置
function setButton() {
    if (window.innerWidth >= 1280) {
        buttonElements[1].classList.add('second');
        buttonElements[3].classList.add('fourth');
    } else {
        buttonElements[1].classList.remove('second');
        buttonElements[3].classList.remove('fourth');
    }
}

onMounted(() => {
    topElement = document.getElementsByClassName('top')[0] as HTMLElement;
    buttonElements = document.getElementsByClassName('category-button') as HTMLCollectionOf<HTMLElement>;
    resize();
    setButton();
    window.addEventListener('resize', resize);
    window.addEventListener('resize', setButton);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', setButton);
});

</script>

<style scoped lang="scss">
.top {
    background-image: url('@/assets/img/background.png');
    background-size: cover;
    block-size: 100vh;
    overflow-y: auto;
    inline-size: 100%;
}

h1 {
    padding-block-start: 1rem;
    text-align: center;
}

.text-area {
    display: flex;
    flex-direction: column;
    margin-block-end: 1rem;
    text-align: center;
    @include mq(pc) {
        flex-direction: row;
        inline-size: 60%;
        justify-content: center;
        margin-inline: auto;
    }
}

.text-1 {
    block-size: auto;
    inline-size: 80%;
    margin-inline: auto;
    @include mq(pc) {
        display: inline;
    }
}

.text-2 {
    block-size: auto;
    inline-size: 40%;
    margin-inline: auto;
}

.category-area {
    display: flex;
    flex-direction: column;
    @include mq(pc) {
        flex-direction: row;
        margin-block-start: 3rem;
    }
}

.category-group {
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-evenly;
    @include mq(pc) {;
        flex-direction: row;
        flex-wrap: nowrap;
        position: relative;
    }
}

.category-button {
    $size: 35%;
    block-size: $size;
    inline-size: $size;
    text-align: center;
    @include mq(pc) {
        block-size: auto;
        inline-size: auto;
        position: absolute;
    }

    &.second {
        margin-block-start: 50%;
        margin-inline-end: -100%;
    }

    &.fourth {
        margin-block-start: 50%;
        margin-inline-start: -100%;
    }
}
</style>

