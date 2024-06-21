"use client"
import { identify } from "@/lib/actions/current-user-action"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"

import { FC,  useLayoutEffect, useState } from "react"

export const Information: FC = () => {

     const [formData, setFormData] = useState({
          username: 'username',
          email: 'Admin@Tn.Ey.Com',
          bio: 'Maecenas semper purus lacus, vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo.',
          date: "",
          Phone: '56 218 004',
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
     <div className="flex flex-row">
     <div className="basis-1/2 m-5" >
        <Input
                              
                              id="username"
                            name="username"
                              value={formData.username}
                              onChange={handleChange}
                               label={"Full Name"}       required   />
      </div>
      <div className="basis-1/2 m-5 " >
        
        <Input
          type="email"
          id="email"
          name="email"
          label={"email"}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
     </div>
      
     <div className="flex flex-row">
     <div className="basis-1/2 mx-5 " >
 
 <Input
                       type="date"
                       id="date"
                       name="date"
                       value={formData.date}
                       onChange={handleChange}
                       required label={"Date of Birth"}        />
</div>
<div className="basis-1/2 mx-5 ">
 
<Input
                              type="text"
                              id="Phone"
                              name="Phone"
                              value={formData.Phone}
                              onChange={handleChange}
                            
                              required label={" Phone Number"}        />
                           
</div>
     </div>
  
       
    

      <div className="flex flex-row-reverse" >
 
     
     <div className="m-5" >

<Button type="submit" title={"save changes"} />

      </div>
      </div>

     
    </form>
      

       </div>
     )
   }
   
     