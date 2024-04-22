'use client'

import React, { FC } from 'react';
import { Button } from '@/ui/button';
 
import { useRouter } from 'next/navigation'

interface Props {
  challenges: Challenge[];
  sections: Section[];
  text:string;
}

export const FormBuilderHeader: React.FC<Props> = ({challenges , sections , text}) => {
  const router = useRouter()
  return (
     <div className="flex justify-between  ">
     <div> <h1 className="text-[32px] font-semibold " >FORM BUILDER</h1>
   <p>Please write the content for the landing page.</p> 
   </div>
  <div> <Button title="Save" size="default" onClick={() => router.push('/preview')} />
   </div>
   </div>
  )
}
