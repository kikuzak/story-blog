<template>
    <div id="wysiwyg" class="editor">
        <ClientOnly>    
            <div class="editor-menu">
                <div id="heading" class="editor-menu-button">
                    <button
                        id="heading-button"
                        @focus="toggleHeadingFocus(true)"
                        @blur="toggleHeadingFocus(false)"
                    >段落</button>
                    <ul class="heading-list" v-show="isHeadingFocus">
                        <li class="heading-item h1" @mousedown="e => setHead(e, 1)">見出し1</li>
                        <li class="heading-item h2" @mousedown="e => setHead(e, 2)">見出し2</li>
                        <li class="heading-item h3" @mousedown="e => setHead(e, 3)">見出し3</li>
                        <li class="heading-item h4" @mousedown="e => setHead(e, 4)">見出し4</li>
                        <li class="heading-item h5" @mousedown="e => setHead(e, 5)">見出し5</li>
                        <li class="heading-item p selected" @mousedown="e => setHead(e, 0)">段落</li>
                    </ul>
                </div>
                <div class="separator"></div>
                <div class="editor-menu-button bold">
                    <p class="label">太字</p>
                    <button
                        id="button-bold"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBold().run();}"
                    >
                        <i class="fa fa-bold ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button italic">
                    <p class="label">斜体</p>
                    <button
                        id="button-em"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleItalic().run();}"
                    >
                        <i class="fa fa-italic ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button strike">
                    <p class="label">打ち消し線</p>
                    <button
                        id="button-strike"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleStrike().run();}">
                        <i class="fa fa-strikethrough ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="separator"></div>
                <div class="editor-menu-button horizon">
                    <p class="label">区切り線</p>
                    <button
                        id="button-horizon"
                        class="button"
                        @click="editor.chain().focus().setHorizontalRule().run()"
                    >
                        ━
                    </button>
                </div>
                <div class="editor-menu-button quote">
                    <p class="label">引用</p>
                    <button
                        id="button-quote"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().setBlockquote().run();}"
                    >
                        <i class="fa fa-quote-right ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button list">
                    <p class="label">リスト</p>
                    <button
                        id="button-ul"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBulletList().run();}"
                    >
                        <i class="fa fa-list-ul ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button list-ol">
                    <p class="label">番号付きリスト</p>
                    <button
                        id="button-ol"
                        class="button"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBulletList().run();}">
                        <i class="fa fa-list-ol ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div id="link" class="editor-menu-button link">
                    <p class="label">リンク</p>
                    <button
                        @focus="toggleLinkFocus(true)"
                    >
                        <i class="fa fa-link ignore-click" aria-hidden="true"></i>
                    </button>
                    <WysiwygLink
                        v-show="isLinkFocus"
                        v-model:isFocus="isLinkFocus"
                        @emitLink="enterLink"
                    />
                </div>
            </div>
            <EditorContent :editor="editor" class="article-content" ref="editor"/>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';

const isHeadingFocus = ref(false);
const isLinkFocus = ref(false);

const emits = defineEmits<{
    (e: 'update:content', val: string): void
}>();

let editor: Editor;

onMounted(() => {
    editor = new Editor({
        content: '',
        extensions: [
            StarterKit,
            Link
        ],
    });
    const target = document.getElementById('wysiwyg') as HTMLElement;
    target.addEventListener('click', updateContent);
});

onBeforeUnmount(() => {
    editor.destroy();
    const target = document.getElementById('wysiwyg') as HTMLElement;
    target.removeEventListener('click', updateContent);
});

function toggleHeadingFocus(value: boolean) {
    isHeadingFocus.value = value;
}

function toggleLinkFocus(value: boolean) {
    isLinkFocus.value = value;
}

function setHead(e: any, num: number) {
    let el = document.getElementById('heading-button') as HTMLElement;
    if (num === 0) {
        editor.chain().focus().setParagraph().run();
        el.innerHTML = "段落";
    } else {
        type Level = 1 | 2 | 3 | 4 | 5;
        editor.chain().focus().toggleHeading({level: num as Level}).run();
        el.innerHTML = `見出し${num}`;
    }

    let els = document.getElementsByClassName('heading-item');
    for (let i = 0; i < els.length; i++) {
        els[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
}

function setActive(target: Element | EventTarget | null) {
    let el = target as Element;
    el.classList.add('active');
}

function toggleActive(target: Element | EventTarget | null) {
    let el = target as Element;
    if (el.classList.contains('active')) el.classList.remove('active');
    else el.classList.add('active');
}

function enterLink(url: string, isTargetBlank: boolean) {
    editor.chain().focus().setLink({href: url, target: (isTargetBlank) ? '_blank' : undefined}).run();
}

function updateContent() {
    const content = editor.getHTML();
    emits('update:content', content);
}

function checkCursor() {
    const marks = editor.state.doc.resolve(editor.state.selection.from).marks();
    let buttons = document.getElementsByClassName('button') as HTMLCollection;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    for (let i = 0; i < marks.length; i++) {
        let target: Element = document.getElementById(`button-${marks[0].type.name}`) as Element;
        if (target) setActive(target);
    }
}

function checkKeyDown(e: KeyboardEvent) {
    // let idName: string;
    // if (e.ctrlKey && e.key === 'b')  idName = 'button-bold';
    // else if (e.ctrlKey && e.key === 'i')  idName = 'button-italic';
    // else idName = "";
    // const target = document.getElementById(idName);
    // if (target) toggle(target);
    const marks = editor.state.doc.resolve(editor.state.selection.to).marks();
    console.log(marks);
}

</script>

<style lang="scss">
.editor-menu {
    align-items: center;
    background-color: $admin-accent-color;
    block-size: 3rem;
    border: 1px solid $admin-main-border-color;
    border-block-end: none;
    border-start-end-radius: 4px;
    border-start-start-radius: 4px;
    display: flex;
    inline-size: 100%;
    padding: 0.5rem;

    .separator {
        block-size: 1rem;
        border: 1px solid $admin-sub-border-color;
        margin-inline-end: 1rem;
    }
}

.heading-area {
    block-size: 3rem;
}

.editor-menu-button {
    display: flex;
    justify-content: center;
    margin-inline-end: 1rem;
    position: relative;
    &:hover .label {
        display: block;
    }

    .label {
        background-color: $admin-sub-color;
        border-radius: 4px;
        color: $admin-sub-text-color;
        display: none;
        font-size: 0.8rem;
        inline-size: auto;
        inset-block-start: -1.8rem;
        padding: 0.2rem;
        position: absolute;
        text-align: center;
    }
    &.bold, &.italic, &.quote {
        .label {
            inline-size: 2.2rem;
        }
    }
    &.strike .label {
        inline-size: 4.6rem;
    }
    &.horizon .label {
        inline-size: 3.8rem;
    }
    &.list, &.link {
        .label {
            inline-size: 3rem;
        }
    }
    &.list-ol .label {
        inline-size: 6.2rem;
    }
}

.link {
    position: relative;
}

button {
    block-size: 2rem;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    font-size: 0.8rem;
    font-family: 'Font Awesome 5 Free';
    inline-size: 1.5rem;
    text-align: center;
    &.active {
        background-color: $admin-active-color;
        border-color: $admin-main-color;
        color: $admin-main-color;
    }
    &:hover {
        border: 1px solid $admin-sub-color;
        color: $admin-main-color;
    }
}

#heading {
    inline-size: 6rem;
    position: relative;
    &:after {
        content: "\f078";
        block-size: 2rem;
        font-family: 'Font Awesome 5 Free';
        font-weight: bold;
        inset-inline-end: 0.4rem;
        line-height: 2rem;
        position: absolute;
    }

    button {
        inline-size: 100%;
        padding-inline-start: 0.4rem;
        text-align: left;
    }
}

.heading-list {
    background-color: #FFF;
    border: 1px solid $admin-main-border-color;
    border-radius: 4px;
    box-shadow: 0 0 10px $admin-shadow-color; 
    inline-size: 10rem;
    position: absolute;
    inset-block-start: 1.2rem;
    inset-inline-start: 0;
    z-index: 10;

    .heading-item {
        padding-block: 0.3rem;
        &.h1 {
            font-size: 1.6rem;
        }
        &.h2 {
            font-size: 1.4rem;
        }
        &.h3 {
            font-size: 1.2rem;
        }
        &.h4 {
            font-size: 1rem;
        }
        &.h5 {
            font-size: 0.8rem;
        }
        &.selected {
            color: $admin-main-color;
        }
        &:hover {
            background-color: $admin-sub-color;
            color: $admin-sub-text-color;
        }
    }
}

.tiptap {
    background-color: #fff;
    min-block-size: 20rem;
    border: 1px solid $admin-main-border-color;
    border-end-end-radius: 4px;
    border-end-start-radius: 4px;
    padding: 0.5rem;
    z-index: 1;
}

</style>