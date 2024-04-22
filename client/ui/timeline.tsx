'use client'
import React, { FC } from 'react';

interface ComponentProps {
     sections: { id: number; name: string; questions: { id: number; text: string }[] }[];
     variant: 'primary' | 'error' | 'success' | 'default';
   }
   

export const TimeLine: FC<ComponentProps> = ({  variant, sections }) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary-yellow';
      case 'error':
        return 'border-red-500';
      case 'success':
        return 'border-green-500';
      default:
        return 'border-gray';
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-yellow';
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-gray';
    }
  };

  return (
     <ol className={`relative border-s-4 ${getBorderColor()}`}>
     {sections.map((section , index) => (
       <li className="mb-10 ms-4">
         <div className={`absolute w-4 h-4 rounded-full -start-2.5 ${getBackgroundColor()}`}></div>
         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.name}</h3>
         <h4 className="mx-3 font-medium">Questions:</h4>
   
         {/* Use fragment for lists */}
         <div className='mx-5' >
           <ul> {/* Wrap questions in a ul element */}
             {section.questions.map(question => (
               <li className="text-gray-500" key={question.id}>{question.text}</li>
             ))}
           </ul>
         </div>
       </li>
         ))}
     </ol>
   );
   
};
