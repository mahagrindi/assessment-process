import React from 'react'; // Import React if not already imported
import { Button } from './button';
import { LuPlusCircle } from 'react-icons/lu';
import { Linker } from './link';

interface CardProps {
 id? : string
  title: string;
  description: string;
  creatAt: string;
  creatBy : string ;
  version : string ;
  imageUrl?: string; // Optional imageUrl
}

const FormCard: React.FC<CardProps> = ({ id , title, description,   creatAt , creatBy  , version }) => {



  return (
   
       

<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<h5 className="  text-xs  mb-2  text-gray-900 ">Version : {version}</h5>
  
<h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
 
 
 

   
    <p className="mb-3 font-normal  text-justify text-gray-700 dark:text-gray-400 line-clamp-2 ">{description}</p>

    <p className=" mb-3 text-[12px] italic  text-gray-500">Cerated at {creatAt} by {creatBy} </p>
   
    <Linker key={'overviwe-form'} size={'large'} title={'Preview'}  href={`/dashboard/evaluations/preview?id=${id}`}  />

</div>
  
  );
};

export default FormCard;
