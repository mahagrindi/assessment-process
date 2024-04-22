 
import { FC, useState } from "react";
import { Button } from "./button";
import { Input } from '@/ui/input';

export const QuestionInput: FC<{ sectionId: number; addQuestion: (text: string) => void }> = ({ sectionId, addQuestion }) => {
     const [text, setText] = useState('');
   
     const handleAddClick = () => {
       if (text.trim() !== '') {
         addQuestion(text);
         setText('');
       }
     };
   
     return (
       <div className="flex  my-5">
       
       <div className="flex-grow">
         <Input
           type="text"
           placeholder="Enter a question"
           label=""
           value={text}
           onChange={(e) => setText(e.target.value)}
           onKeyDown={(e) => {
             if (e.key === 'Enter') {
               handleAddClick();
             }
           }}
         />
       </div>
       <div>
         <Button title='Add Question' variant="primary" className='w-24' onClick={handleAddClick} />
       </div>
     </div>
      );
   }; 