<template>
    <div class="view">
        <div class="base-container">
            <header class="flex-container">
                <nav>
                    <ul class="flex-container category-list">
                    <li
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
                </nav>
                <div class="header-search-area">
                    <NuxtImg
                        class="logo"
                        src="title.png"
                        sizes="md:350px xl:1200px"
                        alt="MARINT GOA"
                    />
                    <SearchBox />
                </div>
            </header>
            <aside>
                <SideBar />
            </aside>
            <article>
                <slot />
            </article>
        </div>
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
    inline-size: 100vw;
    position: relative;
}

header {
    flex-direction: column;
}

nav {
    margin-block-end: 1rem;
}

.header-search-area {
    .logo {
        display: none;
    }
}

.category-button {
    $size: 15vw;
    block-size: $size;
    inline-size: $size;
}
</style>