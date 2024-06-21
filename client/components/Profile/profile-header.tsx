
'use client'

import React, { FC } from 'react';
   
import { motion } from 'framer-motion' 
import { MdOutlineChevronRight } from 'react-icons/md'
import  ApexChart  from '@/components/ApexChart'
interface Props {
     user : AuthUserProfileType
           
}  
export const ProfileHeader: React.FC<Props> = ({user }) => {
  return (
    <div className='bg-primary-white border-[2px] border-gray-200'> 
   
    <div className="grid grid-cols-12 gap-4 my-5 " >



       <div className="col-start-1 col-end-1 mx-5">
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src={user?.profileImage ? user?.profileImage : 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sophie'} alt="" className="h-20 w-20  object-cover flex rounded-full" />
       </div>

     <div className="col-start-2 col-end-6 ">
       <div>
         <p className=" text-[24px]   font-semibold capitalize">{user?.firstName + " " + user?.middleName + " " + user?.lastName}</p>
         <p className=" text-[14px]    font-semibold capitalize">{user?.username}</p>

         <p className="text-gray-600 text-sm">Department : {user?.department} </p>

       </div>
     </div>

     <div className="col-end-12 col-span-2" >
       <ApexChart />
     </div>

   </div>


    </div>
  )
}
