
'use client'

import React, { FC } from 'react';
   
import { motion } from 'framer-motion' 
import { MdOutlineChevronRight } from 'react-icons/md' 
import Accordion from '@/ui/accordion';
interface Props {
     fullName ?: string ;
     email?: string ;
     imgURL?:string ;
     description?:string ;
           
}  
export const StartupGeneralInformation: React.FC<Props> = ({fullName , email , imgURL , description }) => {
  return (
    <div className='bg-primary-white  mx-20  my-10 '> 
   
   <Accordion title="Founder Information ">
        <p>This is the content of section 2</p>
      </Accordion>
       <Accordion title="Legal Information">
        <p>This is the content of section 2</p>
      </Accordion>
       <Accordion title="Structure and Architecture">
        <p>This is the content of section 2</p>
      </Accordion>
   
         
       
          
        
 
    </div>
  )
}
