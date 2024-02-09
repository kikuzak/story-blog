<template>
    <div class="view">
        <aside class="aside side-bar-container inactive" @click="toggleIndex">
            <SideBar />
        </aside>
        <header class="flex-container">
            <nav class="navigation">
                <ul class="flex-container category-list">
                    <li
                        class="category-item"
                        v-for="n in categoryKeys.length"
                        :key="n"
                        @click="linkTo(categoryKeys[n - 1])"
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
        <div class="base-container">
            <article>
                <slot />
            </article>
        </div>
        <footer class="flex-container">
            <p class="back-button"><nuxt-link :to="'/'">戻る</nuxt-link></p>
            <p class="index-button" @click="toggleIndex">索引</p>
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
let headerElement: HTMLElement;
let rootFontSize: number;

// クエリ変化でviewが更新されないためここで更新する
onBeforeRouteUpdate(async () => {
    const navElement = document.getElementsByClassName('side-bar-container')[0];
    navElement.classList.remove('active');
    navElement.classList.add('inactive');
});

const linkTo = (category: string) => {
    router.push(`/${category}`);
}

function toggleIndex() {
    const navElement = document.getElementsByClassName('side-bar-container')[0];
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
    const asideElement = document.getElementsByClassName('aside')[0] as HTMLElement;
    asideElement.style.blockSize = `${window.innerHeight}px`;
}

// ヘッダーを固定にする
function setHeaderClass() {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const scrollTopRem = viewElement.scrollTop / rootFontSize;
    if (scrollTopRem > 6) {
        headerElement.classList.add('scroll');
    } else {
        headerElement.classList.remove('scroll');
    }
}

onMounted(() => {
    viewElement = document.getElementsByClassName('view')[0] as HTMLElement;
    headerElement = document.getElementsByTagName('header')[0];
    rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    resize();
    window.addEventListener('resize', resize);
    // viewElement.addEventListener('scroll', setHeaderClass);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    // viewElement.addEventListener('scroll', setHeaderClass);
});

</script>

<style scoped lang="scss">

body {
    background-color: #FFF;
}

.view {
    background-image: url('@/assets/img/background.png');
    background-size: cover;
    block-size: 100vh;
    font-family: "Sawarabi Mincho";;
    inline-size: 100%;
    overflow-y: auto;
    &:hover {
        overflow: auto;
    }
}

header {
    flex-direction: column;
    padding-inline: 1.5rem;
}

nav {
    margin-block-end: 0.4rem;
}

.header-search-area {
    .logo {
        display: none;
    }
}

.category-list {
    justify-content: space-between;
    gap: 0.4rem;
}

.category-button {
    block-size: 100%;
    inline-size: auto;
}

aside {
    background-color: rgba(0, 0, 0, 0.6);
    block-size: 100vh;
    inline-size: 100%;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 10;
    &.active {
        transition: 0.1s;
        visibility: visible;
        opacity: 255;
    }
    &.inactive {
        opacity: 0;
        visibility: hidden;
        transition: 0.2s;
    }
}

.side-bar {
    position: absolute;
    .active & {
        transition: inset-inline-start 0.14s ease;
        box-shadow: 8px 0 5px rgba(0, 0, 0, 0.4);
        inset-inline-start: 0;
    }
    .inactive & {
        inset-inline-start: -70%;
        transition: inset-inline-start 0.14s ease;
    }
}

footer {
    background-color: $sub-color;
    block-size: 2rem;
    inline-size: 100%;
    inset-block-end: 0;
    padding-inline: 1rem;
    position: fixed;

    p {
        line-height: 2rem;
    }
}
</style>