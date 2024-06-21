"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEvaluationFormsByID } from '../../../../lib/actions/evaluation-server-action'
import { ContentHeader } from '../../../../components/content-header'
import { Button } from '../../../../ui/button'
import { Input } from '../../../../ui/input'
import { TextArea } from '../../../../ui/textarea'
import { FileUpload } from '../../../../ui/file'
import { Switch } from '../../../../ui/switch'
import { Linker } from '../../../../ui/link'
import Card from '@/ui/card-challenge'

export default function Page(): JSX.Element {
  const params = useSearchParams();
  const id = params.get('id');

  const [form, setForm] = useState<FormEvaluation | null >(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDetails = await getEvaluationFormsByID(id!);
        setForm(formDetails);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  function dateConvert(date: string): string {
    const parts = date.split("T")[0].split("-");
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader
        title={'Form builder'}
        args={[

          <Linker key={'create-link-consultant'} size={'large'} title={'Edit'} className={'gap-2 px-3'}
          href={`/dashboard/evaluations/edit?id=${id}`}  />,

        ]}
      />
      <div className='bg-primary-white p-6 border-t-[2px] border-gray-200'>
        {form ? (
          <div className='w-full max-w-7xl flex mx-auto'>
            <div className='basis-1/5 justify-center'>
              <div className='m-10 p-10'></div>{/*
              <TimeLine sections={form.sections} index={index} variant={'default'} />*/}
            </div>
            <div className='p-5 mr-4 basis-4/5'>
              <div className='flex items-center justify-between mb-5'>
                <div className='flex-1'>
                  <p className="mb-3 text-5 italic text-gray-500">{form.version}</p>
                </div>
                <div className='flex-2'>
                  <p className="mb-3 text-5 italic text-gray-500">
                    Created at : {dateConvert(form.createdAt)} <br /> By : {form.createdBy}
                  </p>
                </div>
              </div>

{
  index === 0 ?

    <div>


      <h5 className="text-center mb-5 font-bold text-[32px]">
        {form.title}
      </h5>
      <p className="text-justify">
        <div className="mb-3    " dangerouslySetInnerHTML={{ __html: form.description }} />

      </p>
      <div className="border-b my-6 border-gray-300"></div>
      <div className="mb-3 text-gray-700" dangerouslySetInnerHTML={{
        __html: form.description.replace(/\n\n/g, '</p><p class="ql-align-justify">') + '</p>',
      }} />

      <p className="my-5 font-bold text-[20px]">
        Ce programme offre au startups:
      </p>
      {form.challenges?.map((challeng, i) => (
        <Card key={i} title={challeng.title} description={challeng.description} />
      ))}

    </div>
    : form.sections[index].title === 'Finsh' ? <p>Thank you for send this form , we will contact you soon </p> :
      <div>
        <p className='my-5 font-bold text-[20px]'>
{form.sections[index]?.title}



</p>
{form.sections[index].questions.map(question => (
  <div className='m-5' >
 
               
               {question.questionType === "switch" ? <Switch label={question.questionText}  /> 
               :
               question.questionType === "file" ? <FileUpload label={question.questionText}
                onChange={function (value: string): void {
        throw new Error('Function not implemented.');
      } } /> 
                 : question.questionType === "Textarea" ?  <TextArea label={question.questionText} />
                 : <Input  required={question.requerd }  label={question.questionText} /> 
               
               }
               </div>

             ))}
 
</div>




}

              <div className='grid grid-cols-6 gap-4 my-7'>
                <div className='col-start-1 col-end-1'>
                  { index !== 0 ?  <Button title="Back" size={'small'} variant={'secondary'} onClick={() => setIndex(prevIndex => prevIndex - 1)} />
                  : "" }
                </div>
                <div className='col-start-6 col-end-6 '>
                  
                  <Button title='Next' size={'small'} variant={'primary'} onClick={() => setIndex(prevIndex => prevIndex + 1)} />

                
                </div>
            </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="h-15 w-15 relative">
              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-full border-8 border-primary-yellow animate-ping"></div>
              <div className="relative h-full w-full rounded-full border-8 border-primary-yellow animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
