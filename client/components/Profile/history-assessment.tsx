"use client"
import { identify } from "@/lib/actions/current-user-action"
import { CardAssessment } from "@/ui/card-assessment"

import { FC,  useLayoutEffect } from "react"
import { SearchInput } from '@/components/content-data-table-search'
import { ServerSelect } from '@/ui/storybook/server-select'
import { LuStore } from 'react-icons/lu'

export const HistoryOfAssesment: FC = () => {
  
   
     return (
       <div className="h-full min-h-full w-full">
         <div className='flex items-center justify-between px-6 py-4'>
           <div className='flex-1'>
             <SearchInput placeholder={'search assessment'} className={'max-w-[300px]'} />
           </div>

           <div>
             <ServerSelect
               placeholder={
                 <div className='flex items-center gap-2 capitalize text-gray-400'>
                   <LuStore size={20} />
                   <p className='text-sm font-medium'>Assessment State </p>
                 </div>
               }
               classname={'min-w-[250px]'}
               data={[{ label: "Complete", value: "Complete" } , { label: "Canceled", value: "Canceled" }, { label: "Active", value: "Active" }]}
               paramQuery={'sector'}
             />
           </div>
         </div>
         <div className="grid grid-flow-row  grid-cols-3">
           <div>
             <CardAssessment state={"active"} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"} />
           </div>
           <div>

             <CardAssessment state={"canceled"} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"} />
           </div>
           <div>
             <CardAssessment state={"complete"} note={4} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"}
                             date={"11/12/2023"} />

           </div>
           <div>
             <CardAssessment state={"complete"} note={2} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"}
                             date={"11/12/2023"} />

           </div>
         </div>


       </div>
     )
}
   
     