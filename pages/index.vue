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
    </NuxtLayout>
    
</template>

<script setup lang="ts">
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

</script>

<style scoped lang="scss">
.top {
    background-image: url('@/assets/img/background.png');
    background-size: cover;
    block-size: 100vh;
    inline-size: 100%;
}

h1 {
    padding-block-start: 1rem;
}

.text-area {
    margin-block-end: 1rem;
}

.text-1 {
    block-size: auto;
    inline-size: 80%;
    margin-inline: auto;
}

.text-2 {
    block-size: auto;
    inline-size: 40%;
    margin-inline: auto;
}

.category-group {
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.category-button {
    $size: 35%;
    block-size: $size;
    inline-size: $size;
}
</style>

