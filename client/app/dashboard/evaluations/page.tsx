'use client'
import React, { useState } from 'react'; 
import { AddChallenges } from '@/components/Form-builder/add-challenges'; 
import RichTextEditor from '@/components/RichTextEditor';
import { AddFormSection } from '@/components/Form-builder/add-form-section';
import { FormBuilderHeader } from '@/components/Form-builder/form-builder-header';



export default function Page(): JSX.Element {


  const [sections, setSections] = useState<Section[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [text, setText] = useState("");

  return (
    <div className="m-10">
      <FormBuilderHeader text={text}  challenges={challenges}   sections={sections}  />
      <br />
      <RichTextEditor text={text} setText={setText}  />
      <br />
      <AddChallenges  challenges={challenges }  setChallenges={setChallenges} />
      <br />
      <AddFormSection sections={sections} setSections={setSections} />

    </div>
  );
}
