// components/TiptapEditor.tsx
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import styled from 'styled-components'

const EditorContainer = styled.div`
  min-height: 150px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 35px;
  }
`

const Toolbar = styled.div`
  display: flex;
  margin-bottom: 10px;

  button {
    margin-right: 5px;
    padding: 5px 10px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: #e0e0e0;
    }
  }
`

const TiptapEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1],
      }),
      Bold,
      Italic,
      BulletList,
      ListItem,
    ],
    content: '<p>Hello World!</p>',
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <Toolbar>
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>
      </Toolbar>
      <EditorContainer>
        <EditorContent editor={editor} />
      </EditorContainer>
    </div>
  )
}

export default TiptapEditor
