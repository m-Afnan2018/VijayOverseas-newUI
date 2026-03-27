"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import styles from "./RichTextEditor.module.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("bold") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("italic") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("strike") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <s>S</s>
      </button>

      <div className={styles.divider} />

      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("heading", { level: 2 }) ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("heading", { level: 3 }) ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        H3
      </button>

      <div className={styles.divider} />

      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("bulletList") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("orderedList") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
      >
        1. List
      </button>
      <button
        type="button"
        className={`${styles.toolBtn} ${editor.isActive("blockquote") ? styles.active : ""}`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
      >
        " Quote
      </button>

      <div className={styles.divider} />

      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        — HR
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        ↩ Undo
      </button>
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        ↪ Redo
      </button>
    </div>
  );
};

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start writing...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  return (
    <div className={styles.wrapper}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
