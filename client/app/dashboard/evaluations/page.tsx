'use client'
import React, { useState } from 'react'; 
import { AddChallenges } from '@/components/Form-builder/add-challenges'; 
import RichTextEditor from '@/components/RichTextEditor';
import { AddFormSection } from '@/components/Form-builder/add-form-section';
import { Button } from '@/ui/button';
import { ContentHeader } from '@/components/content-header';
import { Linker } from '@/ui/link';



export default function Page(): JSX.Element {


  const [sections, setSections] = useState<Section[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [text, setText] = useState("");

  return (
    <div className='h-full min-h-full w-full flex flex-col  '>
      <ContentHeader
        title={'Form builder'}
        args={[
         <Button  title='save' />
        ]}
      />
  <div className='bg-primary-white flex flex-col  p-8  border-t-[2px] border-gray-200'>
 
      <br />
      <RichTextEditor text={text} setText={setText}  />
      <br />
      <AddChallenges  challenges={challenges }  setChallenges={setChallenges} />
      <br />
      <AddFormSection sections={sections} setSections={setSections} />
      </div>
    </div>
  );
}
