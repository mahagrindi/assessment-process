import { useState } from 'react';
import { FC } from 'react';
import { MdCancel, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Input } from '@/ui/input'; 
import { TimeLine } from '@/ui/timeline';
import { QuestionInput } from '@/ui/QuestionInput';

 

interface Props {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
} 


export const AddFormSection: React.FC<Props> = ({ sections, setSections }) => {

  const [nextId, setNextId] = useState<number>(1);

  const addSection = () => {
    const newSection: Section = { id: nextId, name: '',  questions: [] };
    setSections([...sections, newSection]);
    setNextId(nextId + 1);
  };

  const handleNameChange = (id: number, value: string) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, name: value } : section
    );
    setSections(updatedSections);
  };

 

  const handleCancel = (id: number) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
  };

  const addQuestion = (sectionId: number, text: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, questions: [...section.questions, { id: Date.now(), text }] } : section
    );
    setSections(updatedSections);
  };

  const removeQuestion = (sectionId: number, questionId: number) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, questions: section.questions.filter(question => question.id !== questionId) } : section
    );
    setSections(updatedSections);
  };

  return (
    <div>
      <h2 className="text-[24px] font-semibold">List of sections</h2>
      <div className="flex flex-row">
        <div className="basis-2/3">
          {sections.map((section) => (
            <div key={section.id} className="my-10">
              <div className="flex flex-row my-4">
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
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100' 
      data-tip="Remove Section"
    >
                <MdCancel
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  size={24}
                  onClick={() => handleCancel(section.id)}
                />
                </div>
                </div>
                <p className="mx-2 text-lg font-medium">Section {section.id}</p>
              </div>
              <div className="w-full grid gap-4 mx-4">
                <Input
                  type="text"
                  placeholder="Enter the section name"
                  label="Section's Name"
                  value={section.name}
                  onChange={(e) => handleNameChange(section.id, e.target.value)}
                />
          
                <div>
                  
                  <h3 className="text-lg font-medium">Questions:</h3>
                  <QuestionInput sectionId={section.id} addQuestion={(text) => addQuestion(section.id, text)} />

                  {section.questions.map(question => (
                    <div key={question.id} className="flex items-center">
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
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100' 
      data-tip="Remove Question"
    >
                      <MdCancel
                      data-tooltip-target="tooltip-default"
                        className="text-red-500 ml-2 cursor-pointer mx-2"
                        size={20}
                        onClick={() => removeQuestion(section.id, question.id)}
                      />
                      </div>
                      </div>
                      <div>{question.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="basis-1/3 mx-5 p-10" >
          
         
              <TimeLine variant={"primary"}    sections={sections} />
        
          
        </div>
      </div>
      <div className='flex justify-center my-10'>

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
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100' 
      data-tip="Add New Section"
    >
        <MdAddCircleOutline
          className="text-gray-400 hover:text-primary-yellow cursor-pointer"
          size={32} onClick={addSection}
        />
        
      </div>
      </div>
      </div>

      
    </div>
  );
};
