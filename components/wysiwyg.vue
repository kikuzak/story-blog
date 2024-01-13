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
                        <li class="heading-item h1" @mousedown="e => setHead(1)">見出し1</li>
                        <li class="heading-item h2" @mousedown="e => setHead(2)">見出し2</li>
                        <li class="heading-item h3" @mousedown="e => setHead(3)">見出し3</li>
                        <li class="heading-item h4" @mousedown="e => setHead(4)">見出し4</li>
                        <li class="heading-item h5" @mousedown="e => setHead(5)">見出し5</li>
                        <li class="heading-item p selected" @mousedown="e => setHead(6)">段落</li>
                    </ul>
                </div>
                <div class="separator"></div>
                <div class="editor-menu-button bold">
                    <p class="label">太字</p>
                    <button
                        id="button-bold"
                        class="button-mark"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBold().run();}"
                    >
                        <i class="fa fa-bold ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button italic">
                    <p class="label">斜体</p>
                    <button
                        id="button-italic"
                        class="button-mark"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleItalic().run();}"
                    >
                        <i class="fa fa-italic ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button strike">
                    <p class="label">打ち消し線</p>
                    <button
                        id="button-strike"
                        class="button-mark"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleStrike().run();}">
                        <i class="fa fa-strikethrough ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="separator"></div>
                <div class="editor-menu-button horizon">
                    <p class="label">区切り線</p>
                    <button
                        id="button-horizon"
                        @click="editor.chain().focus().setHorizontalRule().run()"
                    >
                        ━
                    </button>
                </div>
                <div class="editor-menu-button quote">
                    <p class="label">引用</p>
                    <button
                        id="button-blockquote"
                        class="button-block"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBlockquote().run();}"
                    >
                        <i class="fa fa-quote-right ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button list">
                    <p class="label">リスト</p>
                    <button
                        id="button-ul"
                        class="button-block"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleBulletList().run();}"
                    >
                        <i class="fa fa-list-ul ignore-click" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="editor-menu-button list-ol">
                    <p class="label">番号付きリスト</p>
                    <button
                        id="button-ol"
                        class="button-block"
                        @click="e => {toggleActive(e.target); editor.chain().focus().toggleOrderedList().run();}">
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
            <EditorContent :editor="editor" class="article-content"/>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import type { Node } from '@tiptap/pm/model';

const props = defineProps<{content: string | null}>();

const isHeadingFocus = ref(false);
const isLinkFocus = ref(false);

const emits = defineEmits<{
    (e: 'update:content', val: string): void
}>();

let editor: Editor;

onMounted(() => {
    editor = new Editor({
        content: props.content,
        extensions: [
            StarterKit,
            Link
        ],
        onUpdate: () => {
            const content = editor.getHTML();
            emits('update:content', content);
        },
        onSelectionUpdate: () => {
            const { from, to } = editor.state.selection;
            // 現在地のタグを調べる
            let nodes: Node[] = [];
            editor.state.doc.nodesBetween(from, to, (node, pos) => {
                if (!node.type.isBlock) return;
                nodes.push(node);
            });
            checkTag(nodes);

            if (from === to) {
                // 現在位置のマークを調べる
                let marks = editor.state.selection.$from.marks().map((v) => v.type.name);
                checkMarks(marks);
            } else {
                // 範囲すべてに含まれるマークを調べる
                let marks: string[][] = [];
                editor.state.doc.nodesBetween(from, to, (node, pos) => {
                    if (node.type.isInline) marks.push(node.marks.map(v => v.type.name));
                });
                let commonMarks: string[] = [];
                if (marks.length > 0) commonMarks = marks[0].filter((e) => marks.every((v) => v.includes(e)));
                checkMarks(commonMarks);
            }
            
        }
    });
});

onBeforeUnmount(() => {
    editor.destroy();
});

// ヘッダーが選択されていれば、選択肢を表示
function toggleHeadingFocus(value: boolean) {
    isHeadingFocus.value = value;
}

// リンクが選択されていれば、メニューを表示
function toggleLinkFocus(value: boolean) {
    isLinkFocus.value = value;
}

// 段落・見出しを設定
function setHead(num: number) {
    let el = document.getElementById('heading-button') as HTMLElement;
    if (num === 6) {
        // 6は段落
        editor.chain().focus().setParagraph().run();
        
    } else {
        type Level = 1 | 2 | 3 | 4 | 5;
        editor.chain().focus().toggleHeading({level: num as Level}).run();
    }

    setHeadItem(num);
}

function setHeadItem(num: number) {
    let el = document.getElementById('heading-button') as HTMLElement;
    if (num === 6) {
        el.innerHTML = "段落";
    } else {
        el.innerHTML = `見出し${num}`;
    }
    let els = document.getElementsByClassName('heading-item');
    for (let i = 0; i < els.length; i++) {
        if (i === num - 1) els[i].classList.add('selected');
        else els[i].classList.remove('selected');
    }
}

// 要素にactiveクラスを設定
function setActive(target: Element | EventTarget | null) {
    let el = target as Element;
    el.classList.add('active');
}

// 要素のactiveクラスをtoggle
function toggleActive(target: Element | EventTarget | null) {
    let el = target as Element;
    if (el.classList.contains('active')) {el.classList.remove('active');console.log(true);}
    else {el.classList.add('active'); console.log(false)}
}

// リンクを入力した
function enterLink(url: string, isTargetBlank: boolean) {
    editor.chain().focus().setLink({href: url, target: (isTargetBlank) ? '_blank' : undefined}).run();
}

// 与えられた名前のマークのボタンをactiveにする
function checkMarks(markNames: string[]) {
    let buttons = document.getElementsByClassName('button-mark') as HTMLCollection;
    // 既存のactiveクラスを削除
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    // 新しくactiveをつける
    for (let i = 0; i < markNames.length; i++) {
        let target: Element = document.getElementById(`button-${markNames[i]}`) as Element;
        if (target) setActive(target);
    }
}
// 現在地のブロックタグをチェックする
function checkTag(nodes: Node[]) {
    let buttons = document.getElementsByClassName('button-block') as HTMLCollection;
    // 既存のactiveクラスを削除
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    // 新しくactiveをつける
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type.name === 'heading') {
            setHeadItem(nodes[i].attrs.level);
            continue;
        } else if (nodes[i].type.name === 'paragraph') {
            setHeadItem(6);
            continue;
        }
        let target: Element = document.getElementById(`button-${nodes[i].type.name}`) as Element;
        if (target) setActive(target);
    }
    //  else {
    //     let buttons = document.getElementsByClassName('button-block') as HTMLCollection;
    //     for (let i = 0; i < buttons.length; i++) {
    //         buttons[i].classList.remove('active');
    //     }
    //     for (let i = 0; i < markNames.length; i++) {
    //         let target: Element = document.getElementById(`button-${markNames[i]}`) as Element;
    //         if (target) setActive(target);
    //     }
    // }
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
    padding-block: 2rem;
    padding-inline: 2rem;
    z-index: 1;
}

</style>