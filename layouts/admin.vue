<template>
    <div class="admin">
        <div class="flex-container">
            <AdminSidebar />
            <article class="main">
                <slot />
            </article>
        </div>
    </div>
</template>

<style scoped lang="scss">
.admin {
    font-family: $base-font-family;
}
article {
    inline-size: calc(100vw - $admin-sidebar-size);
    background-color: $admin-bg-color;
    padding-block: 2rem;
}
</style>