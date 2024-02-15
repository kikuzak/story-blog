<template>
    <div class="view">
        <header class="flex-container">
            <nav class="navigation">
                <ul class="flex-container category-list">
                    <li
                        class="category-item"
                        v-for="n in categoryKeys.length"
                        :key="n"
                    >
                        <CategoryButtonSearch
                            :category="categoryKeys[n - 1]"
                        />
                    </li>
                </ul>
            </nav>
            <div class="header-search-area">
                <picture class="logo">
                    <source srcset="~/assets/img/title_sp.png">
                    <img src="~/assets/img/title_sp.png" alt="MARINTO GOA">
                </picture>
                <SearchBox />
            </div>
        </header>
        <div class="content">
            <aside class="aside side-bar-container inactive" @click="toggleIndex">
                <SideBar />
            </aside>
            <div class="base-container">
                <article>
                    <slot />
                </article>
            </div>
        </div>
        <footer class="flex-container">
            <p class="back-button">戻る</p>
            <p class="index-button">索引</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
useHead({
    link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Sawarabi+Mincho'}
    ]
});

const router = useRouter();
const categoryKeys = Conf.getCategoryKeys();
let viewElement: HTMLElement;
let navElement: HTMLElement;

// クエリ変化でviewが更新されないためここで更新する
onBeforeRouteUpdate(async () => {
    if (window.innerWidth < 1280) {
        navElement.classList.remove('active');
        navElement.classList.add('inactive');
    }
});

const linkTo = (category: string) => {
    router.push(`/${category}`);
}

function toggleIndex() {
    if (window.innerWidth >= 1280) return;
    if (navElement.classList.contains('active')) {
        navElement.classList.remove('active');
        navElement.classList.add('inactive');
    }
    else {
        navElement.classList.add('active');
        navElement.classList.remove('inactive');
    }
}

// windowの高さを調節する
function resize() {
    viewElement.style.blockSize = `${window.innerHeight}px`;
}

// pcのときにnavを表示する
function showNav() {
    if (window.innerWidth >= 1280) {
        navElement.classList.remove('active');
        navElement.classList.remove('inactive');
    } else {
        navElement.classList.remove('active');
        navElement.classList.add('inactive');
    }
}

onMounted(() => {
    viewElement = document.getElementsByClassName('view')[0] as HTMLElement;
    navElement = document.getElementsByClassName('side-bar-container')[0] as HTMLElement;
    resize();
    showNav();
    window.addEventListener('resize', resize);
    window.addEventListener('resize', showNav);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', showNav);
});

</script>

<style scoped lang="scss">

body {
    background-color: #FFF;
}

.view {
    background-image: url('@/assets/img/background.png');
    background-size: cover;
    block-size: 100%;
    font-family: "Sawarabi Mincho";;
    inline-size: 100%;
    overflow-y: auto;
    &:hover {
        overflow: auto;
    }
}

header {
    flex-direction: column;
    margin-inline: auto;
    padding-inline: 1.5rem;
    @include mq(tab) {
        align-items: center;
        flex-direction: row-reverse;
        max-inline-size: 1000px;
    }
    @include mq(pc) {
        gap: 5rem;
        max-inline-size: 1240px;
    }
}

nav {
    margin-block-end: 0.4rem;
    @include mq(pc) {
        flex: 2;
    }
}

.header-search-area {
    @include mq(tab) {
        inline-size: calc(50% - 1rem);
        margin-inline-end: 1rem;
    }
    @include mq(pc) {
        flex: 1;
        margin-block-start: 1rem;
    }

    .logo {
        display: none;
        @include mq(pc) {
            display: block;
            inline-size: 80%;
        }
    }
}

.category-list {
    justify-content: space-between;
    gap: 0.4rem;
    @include mq(pc) {
        gap: 2rem;
    }
}

.category-button {
    block-size: 100%;
    inline-size: auto;
}

.base-container {
    @include mq(pc) {
        flex: 4;
        padding-block: 0;
    }
}

.content {
    @include mq(pc) {
        margin-inline: auto;
        max-inline-size: 1240px;
        padding-block-start: 2rem;
        display: flex;
    }
}

aside {
    background-color: rgba(0, 0, 0, 0.6);
    block-size: 100%;
    inline-size: 100%;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 10;
    @include mq(pc) {
        background-color: transparent;
        flex: 1;
        margin-inline-end: 1.5rem;
        margin-inline-start: 1.5rem;
        position: relative;
        transition: none;
        visibility: visible;
    }
    &.active {
        transition: 0.1s;
        visibility: visible;
        opacity: 255;
        @include mq(pc) {
            transition: none;
        }
    }
    &.inactive {
        opacity: 0;
        visibility: hidden;
        transition: 0.2s;
        @include mq(pc) {
            transition: none;
        }
    }
}

.side-bar {
    position: absolute;
    @include mq(pc) {
        background-color: rgba(178, 141, 93, .45);
        border-radius: 4px;
        box-shadow: none;
        inline-size: 100%;
        position: relative;
    }
    .active & {
        transition: inset-inline-start 0.14s ease;
        box-shadow: 8px 0 5px rgba(0, 0, 0, 0.4);
        inset-inline-start: 0;
        @include mq(pc) {
            transition: none;
        }
    }
    .inactive & {
        inset-inline-start: -70%;
        transition: inset-inline-start 0.14s ease;
        @include mq(pc) {
            transition: none;
        }
    }
}

footer {
    background-color: $sub-color;
    block-size: 2rem;
    inline-size: 100%;
    inset-block-end: 0;
    padding-inline: 1rem;
    position: fixed;
    @include mq(pc) {
        visibility: hidden;
    }

    p {
        line-height: 2rem;
    }
}
</style>