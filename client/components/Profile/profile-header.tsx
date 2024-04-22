
'use client'

import React, { FC } from 'react';
   
import { motion } from 'framer-motion' 
import { MdOutlineChevronRight } from 'react-icons/md' 
interface Props {
     fullName ?: string ;
     email?: string ;
     imgURL?:string ;
     description?:string ;
           
}  
export const ProfileHeader: React.FC<Props> = ({fullName , email , imgURL , description }) => {
  return (
    <div className='bg-primary-white border-[2px] border-gray-200'> 
   
   <div className="flex flex-row  my-5 " >
   <div  className='mx-5'> 
   {
     imgURL ?  <img src={imgURL} alt='' className='h-20  object-cover flex rounded-full' /> : <img src='https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sophie' alt='' className='h-20  object-cover flex rounded-full' />
   }
   </div>
   <div className="  basis-1/3"  >
   <div>
   <p className=' text-[24px]   font-semibold capitalize'>{fullName}</p>
   <p className=' text-[14px]    font-semibold capitalize'>{email}</p>

  <p className='text-gray-600 text-sm'>{description}</p>
   </div>
   </div>
   
   </div>
    
         
       
          
        
 
    </div>
  )
}
