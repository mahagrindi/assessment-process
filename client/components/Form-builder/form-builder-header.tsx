'use client'

import React, { FC } from 'react';
import { Button } from '@/ui/button';
 
import { useRouter } from 'next/navigation'
export const FormBuilderHeader: FC = () => {
  const router = useRouter()
  return (
     <div className="flex justify-between  ">
     <div> <h1 className="text-[32px] font-semibold " >FORM BUILDER</h1>
   <p>Please write the content for the landing page.</p> 
   </div>
  <div> <Button title="Save" size="default" onClick={() => router.push('/dashboard/evaluations/preview')} />
   </div>
   </div>
  )
}
