import React from 'react'; // Import React if not already imported
import { Button } from './button';
import { MdFileDownload } from "react-icons/md";
interface CardProps {
     note?: GLfloat ;
     state : string ;
     description: string;
     date : string ;
   
}

export const CardAssessment: React.FC<CardProps> = ({ note , description, state  , date }) => {
  return (
    <div className="m-10 my-5 rounded-md shadow-md p-[25px] border border-gray-200   dark">
     <div className="flex justify-between ">
          
<div  >
    
     <div className={ ` ${state ==  "active" ? " bg-blue-100 text-blue-700 " : state ==  "canceled" ? " bg-red-100  text-red-700 " :" bg-green-100  text-green-700 " }  rounded-full   shadow-s p-[3px] px-[5px] text-center    m-0  `} > 
          <div className='flex'>
          <div className=  { ` rounded-full h-2 w-2  m-2  ${state ==  "active" ? " bg-blue-700  " : state ==  "canceled" ? " bg-red-700    " :" bg-green-700   " }  `} ></div>
 <p className='mr-2' >{state}</p>
          </div>
    </div>

</div>
<div >
     <p>Score : {note ? note : "-"}</p>
     <p className='text-[15px] text-gray-400 mx-1 my-1'>{date}</p>
</div>
     </div>
     <div className="flex flex-row my-3 mb-5">
     <p>{description}</p>

     
 
    </div>
    <div className="flex justify-between  ">

    <div className='relative'>
    <div 
      className='before:absolute before:content-[attr(data-tip)]
       before:px-3 before:py-2 before:left-1/2 before:-top-3 
       before:w-max before:max-w-xs before:-translate-x-1/2 
       before:-translate-y-full before:bg-primary-black 
       before:text-primary-white 
       before:text-sm 

       before:rounded-md before:opacity-0 
       before:transition-all after:absolute after:left-1/2 
       after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 
       after:border-8 
       after:border-t-primary-black after:border-l-transparent 
       after:border-b-transparent after:border-r-transparent 
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100 ' 
      data-tip="Export assessment details"
    >
     <Button  variant={"primary"} icon={<MdFileDownload className='hover:motion-safe:animate-bounce w-6 h-6  ' viewBox="0 0 24 24" />} />
    </div>
  </div>
    <div>
    
</div>
<div>
<Button  title="read More" />
</div>
     
 
    </div> 
    </div>
  );
};

 
