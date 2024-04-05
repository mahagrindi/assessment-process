import React, { FC } from 'react';
import { Button } from '@/ui/button';

export const FormBuilderHeader: FC = () => {
  return (
     <div className="flex justify-between  ">
     <div> <h1 className="text-[32px] font-semibold " >Form builder</h1>
   <p>Please write the content for the landing page.</p> 
   </div>
  <div> <Button title="Save" size="default" />
   </div>
   </div>
  )
}
