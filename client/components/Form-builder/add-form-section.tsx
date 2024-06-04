import React, { useState } from 'react'
import { MdCancel, MdAddCircleOutline } from 'react-icons/md'
import { Input } from '@/ui/input'
import { QuestionInput } from '@/ui/QuestionInput'
import { DropDown } from '@/ui/dropdown'

interface AddFormSectionProps {
  sections: Section[]
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
}

export const AddFormSection: React.FC<AddFormSectionProps> = ({ sections, setSections }) => {
  const [nextId, setNextId] = useState<number>(1)
  const [nextQuestionId, setNextQuestionId] = useState<number>(1)
  const [typeQuestion, setTypeQuestion] = useState<string>()
  const [required, setRequired] = useState<string>()

  const addSection = () => {
    const newSection: Section = { index: nextId, title: '', questions: [] }
    setSections([...sections, newSection])
    setNextId(nextId + 1)
  }

  const handleNameChange = (index: number, value: string) => {
    const updatedSections = sections.map((section) => (section.index === index ? { ...section, title: value } : section))
    setSections(updatedSections)
  }

  const handleCancel = (index: number) => {
    const updatedSections = sections.filter((section) => section.index !== index)
    setSections(updatedSections)
  }

  const addQuestion = (sectionIndex: number, questionText: string, questionType: string | undefined, required: string | undefined) => {
    const updatedSections = sections.map((section) =>
      section.index === sectionIndex
        ? {
            ...section,
            questions: [...section.questions, { index: nextQuestionId, questionText, questionType, required }],
          }
        : section
    )
    setSections(updatedSections)
    setNextQuestionId(nextQuestionId + 1) // Increment the question ID
  }

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = sections.map((section) =>
      section.index === sectionIndex
        ? {
            ...section,
            questions: section.questions.filter((question) => question.index !== questionIndex),
          }
        : section
    )
    setSections(updatedSections)
  }

  return (
    <div>
      <div className='flex flex-row'>
        <div className='basis-2/3'>
          {sections.map((section) => (
            <div key={section.index} className='my-10'>
              <div className='flex flex-row my-4'>
                <div className='relative'>
                  <div
                    className='before:absolute before:content-[attr(data-tip)]
                      before:px-3 before:py-2 before:left-1/2 before:-top-3
                      before:w-max before:max-w-xs before:-translate-x-1/2
                      before:-translate-y-full before:bg-primary-black
                      before:text-primary-white
                      before:text-sm before:rounded-md before:opacity-0
                      before:transition-all after:absolute after:left-1/2
                      after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2
                      after:border-8 after:border-t-primary-black after:border-l-transparent
                      after:border-b-transparent after:border-r-transparent
                      after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100'
                    data-tip='Remove Section'>
                    <MdCancel className='text-red-500 hover:text-red-700 cursor-pointer' size={24} onClick={() => handleCancel(section.index)} />
                  </div>
                </div>
                <p className='mx-2 text-lg font-medium'>Section {section.index}</p>
              </div>
              <div className='w-full grid gap-4 mx-4'>
                <Input type='text' placeholder='Enter the section name' label="Section's Name" value={section.title} onChange={(e) => handleNameChange(section.index, e.target.value)} />
                <div>
                  <h3 className='text-lg font-medium'>Questions:</h3>
                  <p className='text-sm text-content-prompt mb-1'>Add the question and Select the type of question&apos;s respond.</p>
                  <div className='flex flex-row my-5'>
                    <div className='basis-1/5'>
                      <DropDown
                        data={[
                          { label: 'Input Text', value: 'Text' },
                          { label: 'Input Switch', value: 'Switch' },
                          { label: 'Input Multi-select', value: 'Multi-select' },
                        ]}
                        value={typeQuestion}
                        onChange={setTypeQuestion}
                      />
                    </div>

                    <div className='basis-1/5'>
                      <DropDown
                        data={[
                          { label: 'Required', value: 'Required' },
                          { label: 'Not Required', value: 'Not Required' },
                        ]}
                        value={required}
                        onChange={setRequired}
                      />
                    </div>
                    <div className='basis-3/5'>
                      <QuestionInput sectionId={section.index} addQuestion={(text) => addQuestion(section.index, text, typeQuestion, required)} />
                    </div>
                  </div>

                  {section.questions.map((question) => (
                    <div key={question.index} className='flex items-center'>
                      <div className='relative'>
                        <div
                          className='before:absolute before:content-[attr(data-tip)]
                            before:px-3 before:py-2 before:left-1/2 before:-top-3
                            before:w-max before:max-w-xs before:-translate-x-1/2
                            before:-translate-y-full before:bg-primary-black before:text-primary-white
                            before:text-sm before:rounded-md before:opacity-0 before:transition-all
                            after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0
                            after:-translate-x-1/2 after:border-8 after:border-t-primary-black
                            after:border-l-transparent after:border-b-transparent
                            after:border-r-transparent after:opacity-0 after:transition-all
                            hover:before:opacity-100 hover:after:opacity-100'
                          data-tip='Remove Question'>
                          <MdCancel className='text-red-500 ml-2 cursor-pointer mx-2' size={20} onClick={() => removeQuestion(section.index, question.index)} />
                        </div>
                      </div>
                      <div>
                        Question {question.index} {question.required === 'Required' ? ' * ' : ' '}: {question.questionText} {'  '}
                      </div>
                      <div className=' italic text-gray-400 text-sm pl-1 '>
                        {'  '} ({question.questionType})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='basis-1/3 mx-5 p-10'>{/* <TimeLine variant={'primary'} sections={sections} /> */}</div>
      </div>
      <div className='flex justify-center my-10'>
        <div className='relative'>
          <div
            className='before:absolute before:content-[attr(data-tip)]
              before:px-3 before:py-2 before:left-1/2 before:-top-3
              before:w-max before:max-w-xs before:-translate-x-1/2
              before:-translate-y-full before:bg-primary-black before:text-primary-white
              before:text-sm before:rounded-md before:opacity-0 before:transition-all
              after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0
              after:-translate-x-1/2 after:border-8 after:border-t-primary-black
              after:border-l-transparent after:border-b-transparent
              after:border-r-transparent after:opacity-0 after:transition-all
              hover:before:opacity-100 hover:after:opacity-100'
            data-tip='Add New Section'>
            <MdAddCircleOutline className='text-gray-400 hover:text-primary-yellow cursor-pointer' size={32} onClick={addSection} />
          </div>
        </div>
      </div>
    </div>
  )
}
