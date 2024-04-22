"use client"
import { identify } from "@/lib/actions/current-user-action"
import { CardAssessment } from "@/ui/card-assessment"

import { FC,  useLayoutEffect } from "react"

export const HistoryOfAssesment: FC = () => {
  
   
     return (
       <div className="h-full min-h-full w-full">
     <div className="grid grid-flow-row  grid-cols-3 gap-3">
          <div >
     <CardAssessment   state={"active"} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"}  />
     </div>
     <div >

     <CardAssessment   state={"canceled"} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"}  />
     </div>
     <div >
 <CardAssessment   state={"complete"}  note={4} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"}  />
   
     </div>
     <div >
 <CardAssessment   state={"complete"}  note={2} description={"vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo"} date={"11/12/2023"}  />
   
     </div>
     </div>
   
   
        
       </div>
     )
   }
   
     