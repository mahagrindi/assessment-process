import React, { useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface Props {
  text?: string
  error?: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

const RichTextEditorComponent: React.FC<Props> = ({ text, setText, error }) => {
  const quillRef = useRef<HTMLDivElement>(null)
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null)

  const initializeQuill = (element: HTMLDivElement) => {
    if (element && !quillInstance) {
      const quill = new Quill(element, {
        theme: 'snow',
        modules: {
          toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
        },
      })

      quill.on('text-change', () => {
        const html = quill.root.innerHTML
        setText(html)
      })

      setQuillInstance(quill)
    }
  }

  return (
    <div className='mb-10'>
      <div ref={(el) => el && initializeQuill(el)} />
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default RichTextEditorComponent
