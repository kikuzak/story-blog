<template>
    <div class="view">
        <aside class="side-bar-container" @click="toggleIndex">
            <SideBar />
        </aside>
        <div class="base-container">
            <header class="flex-container">
                <nav class="navigation">
                    <div class="navigation-bg">
                        <ul class="flex-container category-list">
                            <li
                                class="category-item"
                                v-for="n in categoryKeys.length"
                                :key="n"
                                @click="linkTo(categoryKeys[n - 1])"
                            >
                                <CategoryButton
                                    :page="'top'"
                                    :category="categoryKeys[n - 1]"
                                    :isInitailActive="false"
                                />
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="header-search-area">
                    <picture class="logo">
                        <source srcset="~/assets/img/title_sp.png">
                        <img src="~/assets/img/title_sp.png" alt="MARINTO GOA">
                    </picture>
                    <SearchBox />
                </div>
            </header>
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

const linkTo = (category: string) => {
    router.push(`/${category}`);
}

function toggleIndex() {
    const navElement = document.getElementsByClassName('side-bar-container')[0];
    if (navElement.classList.contains('active')) navElement.classList.remove('active');
    else navElement.classList.add('active');
}

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
    position: relative;
    &:hover {
        overflow: auto;
    }
}

header {
    flex-direction: column;
}

nav {
    margin-block-end: 0.4rem;
    &.active {
        
    }
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
    opacity: 0;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: -100%;
    transition: opacity 100ms 0s ease;
    z-index: 10;
    &.active {
        inset-inline-start: 0%;
        opacity: 255;
    }
}

.side-bar {
    inset-inline-start: -70%;
    position: absolute;
    .active & {
        box-shadow: 8px 0 5px rgba(0, 0, 0, 0.4);
        inset-inline-start: 0;
        transition: all 140ms 0s ease;
    }
}

footer {
    background-color: $sub-color;
    block-size: 2rem;
    inline-size: 100%;
    inset-block-end: 0;
    padding-inline: 1rem;
    position: absolute;

    p {
        line-height: 2rem;
    }
}
</style>