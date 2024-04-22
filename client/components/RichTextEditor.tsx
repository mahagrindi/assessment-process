import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const RichTextEditor: React.FC<Props> = ({ text, setText }) => {
  const quillRef = useRef<HTMLDivElement>(null);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }], // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['clean'] // remove formatting button
  ];

  useEffect(() => {
    const editor = quillRef.current;
    if (!editor) return;

    const quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Compose an epic...',
      theme: 'snow',
    });

    quill.on('text-change', () => {
      const html = editor.innerHTML;
      setText(html);
    });

    return () => {
      quill.off('text-change');
    };
  }, []);

  return <div id="editor" ref={quillRef} />;
};

export default RichTextEditor;
