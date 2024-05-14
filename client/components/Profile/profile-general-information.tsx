"use client"
import { identify } from "@/lib/actions/current-user-action"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input" 
import { Textarea } from "@/ui/textarea"

import { FC,  useLayoutEffect, useState } from "react"

export const Information: FC = () => {

     const [formData, setFormData] = useState({
          username: 'wale.sebii@Ey.Com',
          role: 'Admin',
          firstName: 'wale',
          lastName: 'sebii',
          middleName: '-',
          phoneNumber: '56 218 004',
          jobTitle: 'Develop',
          department :'inovation',
          cin: "11419183",
      
        });
      
        const handleChange = (e: { target: { name: any; value: any } }) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
     const handleSubmit = (e: { preventDefault: () => void }) => {
          e.preventDefault();
          // Handle form submission logic here
          console.log(formData);
        };
   
     return (
       <div className="h-full min-h-full w-full">
     
   
     <form onSubmit={handleSubmit}>


     <div className="flex flex-row mt-5">
     <div className="basis-1/3  mr-5" >
 
 <Input
                       type="text"
                       id="firstName"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                       required label={"firstName"}        />
</div>
<div className="basis-1/3 mx-5 ">
 
<Input
                              type="text"
                              id="middleName"
                              name="middleName"
                              value={formData.middleName}
                              onChange={handleChange}
                            
                              required label={" middleName "}        />
                           
</div>
<div className="basis-1/3 mx-5 ">
 
<Input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            
                              required label={" lastName "}        />
                           
</div>
     </div>
     
     <div className="flex flex-row mt-5">
     <div className="basis-2/3  mr-5  ">
        <Input
                              type="email"
                              id="username"
                            name="username"
                              value={formData.username}
                              onChange={handleChange}
                               label={"Email"}       required   />
      
      </div>
      <div className="basis-2/3 mx-5 ">
 <Input
                       type="text"
                       id="phoneNumber"
                       name="phoneNumber"
                       value={formData.phoneNumber}
                       onChange={handleChange}
                       required label={"phoneNumber"}        />
 
 </div>
 
     </div>
  
    
      <div className="flex flex-row-reverse" >
 
     
     <div className="m-5 mt-10" >

<Button type="submit" title={"save changes"} />

      </div>
      </div>

     
    </form>
      

       </div>
     )
   }
   
     