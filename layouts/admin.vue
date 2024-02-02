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

<style lang="scss">
.admin {
    font-family: $base-font-family;
    color: $admin-main-text-color;
    article {
        block-size: 100vh;
        inline-size: calc(100% - $admin-sidebar-size);
        background-color: $admin-bg-color;
        padding-block: 2rem;
    }

    .main {
        overflow-y: auto;
    }

    h1 {
        flex: 0 0 auto;
        margin-block-end: 1rem;
    }

    .content-item {
        input, select {
            background-color: #FFF;
            block-size: 2.4rem;
            border: 1px solid $admin-main-border-color;
            border-radius: 4px;
            font-size: 1rem;
            inline-size: 100%;
            line-height: 2.4rem;
            padding-inline: 0.6rem;
            &:focus {
                border-color: $admin-main-color;
            }

            &.error {
                border-color: $alert-color;
            }
        }

        .disable {
            background-color: $admin-disabled-color;
        }

        .input-select-list {
            background-color: #FFF;
            border: 1px solid $admin-sub-border-color;
            border-radius: 4px;
            line-height: 1rem;
            max-block-size: 20rem;
            overflow-y: auto;

            .input-select-item {
                padding-block: 0.3rem;
                padding-inline: 0.3rem;
                &:hover {
                    background-color: $admin-sub-color;
                    color: $admin-sub-text-color;
                }
            }
        }
    }

    .top-bar {
        align-items: center;
        border-block-end: 2px solid $admin-sub-border-color;
        flex: 0 0 auto;
        inline-size: 100%;
        padding-block: 0.4rem 1rem;

        .add-button {
            background-color: $admin-main-color;
            block-size: 2.4rem;
            border-radius: 4px;
            inline-size: 6rem;

            a {
                block-size: 2.4rem;
                color: $admin-sub-text-color;
                font-size: 1rem;
                line-height: 2.4rem;
                text-align: center;
            }
            &:hover {
                opacity: 0.8;
            }
        }
    }

    .content {
        display: flex;
        flex: 1;
        flex-flow: column;
    }

    .table-wrapper {
        flex: 1;
    }

    .pager-wrapper, .delete-wrapper {
        align-items: center;
        block-size: 3rem;
        flex: 0 0 auto;
    }

    table {
        block-size: 100%;
        display: flex;
        flex-flow: column;

        th {
            font-weight: bold;
        }

        tr {
            align-items: center;
            block-size: 2.8rem;
            border-bottom: 1px solid $admin-sub-border-color;
            display: flex;
            flex-flow: row;
            inline-size: 100%;
            line-height: 2.8rem;
            padding-inline: 1rem;
            &:has(.checkbox:checked) {
                background-color: $admin-accent-color;
            }
        }

        thead {
            border-bottom: 2px solid $admin-sub-border-color;
        }

        tbody {
            overflow-y: auto;

            tr:hover {
                background-color: $admin-sub-border-color;
            }
        }
        .checkbox {
            block-size: 1rem;
            border: 1px solid $admin-main-text-color;
            border-radius: 2px;
            cursor: pointer;
            inline-size: 1rem;
            position: relative;
            &:checked {
                background-color: $admin-sub-color;
                border-color: $admin-sub-color;
                display: block;
                line-height: 20px;
                text-align: center;
                &::before {
                    block-size: 1rem;
                    color: $admin-sub-text-color;
                    content: '\f00c';
                    display: block;
                    font-family: 'Font Awesome 5 Free';                
                    font-size: 0.7rem;
                    font-weight: bold;
                    inline-size: 1rem;
                    line-height: 1rem;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                }
            }
        }

        .edit-button {
            background-color: #BBB;
            block-size: 1.8rem;
            border-radius: 4px;
            color: $admin-main-text-color;
            font-size: 0.8rem;
            inline-size: 3.2rem;
            line-height: 1.8rem;
            text-align: center;
            
            a {
                display: block;
                block-size: 1.8rem;
                inline-size: 3.2rem;
            }
            &:hover {
                cursor: pointer;
                box-shadow: 2px 2px 2px #CCC;
                opacity: 0.8;
            }
        }
    }

    .delete-wrapper p {
        font-size: 0.8rem;
    }

    .delete-button {
        background-color: $alert-color;
        block-size: 2.4rem;
        border-radius: 4px;
        inline-size: 8rem;

        p {
            block-size: 2.4rem;
            color: $admin-sub-text-color;
            font-size: 1rem;
            line-height: 2.4rem;
            text-align: center;
        }
        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    .ignore-click {
        pointer-events: none;
    }
}
</style>