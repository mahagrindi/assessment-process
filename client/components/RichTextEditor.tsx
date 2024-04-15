"use client";
import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = () => {
  const quillRef = useRef(null);

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

    // Add console logs for debugging
    console.log('Quill editor created'); // Log editor creation

    quill.on('text-change', () => {
      console.log('Text changed:', quill.root.innerHTML);
    });

    return () => {
      quill.off('text-change');
    };
  }, []);

  return <div id="editor" ref={quillRef} />;
};

export default RichTextEditor;