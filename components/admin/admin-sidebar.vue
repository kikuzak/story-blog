<template>
    <aside class="sub-menu">
        <h2><nuxt-link to="/admin">ダッシュボード</nuxt-link></h2>
        <div class="sub-menu-content">
            <ul class="sub-menu-list">
                <li class="sub-menu-item">
                    <nuxt-link to="/admin/article" active-class="active">記事管理</nuxt-link>
                </li>
                <li class="sub-menu-item">
                    <nuxt-link to="/admin/author" active-class="active">著者管理</nuxt-link>
                </li>
            </ul>
        </div>
        
    </aside>
</template>

<style scoped lang="scss">
.sub-menu {
    background-color: $admin-main-color;
    block-size: 100vh;
    color: $admin-sub-text-color;
    inline-size: $admin-sidebar-size;
    .sub-menu-content {
        block-size: calc(100vh - 5rem);
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    h2 {
        block-size: 5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        font-size: 1.1rem;
        line-height: 5rem;
        a {
            padding-inline-start: 1rem;
        }
    }
    a:hover {
        background-color: $admin-sub-color;
    }
    .sub-menu-list {
        .sub-menu-item {
            block-size: 3rem;
            line-height: 3rem;
            a.router-link-exact-active {
                background-color: #6881af;
            }
            a:before {
                content: "-";
                margin-inline-end: 0.2rem;
                padding-inline-start: 2rem;
            }
        }
    }
}
</style>