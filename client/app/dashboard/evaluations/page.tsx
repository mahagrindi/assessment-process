"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import { ContentHeader } from '@/components/content-header';
import FormCard from '@/ui/forms-card';
import { getEvaluationForms } from '@/lib/actions/evaluation-server-action';
import { useRouter } from 'next/router';
import { SearchInput } from '@/components/content-data-table-search';
import { ServerSelect } from '@/ui/storybook/server-select';
import { LuPlusCircle, LuStore } from 'react-icons/lu';
import { Linker } from '@/ui/link';

export default function Page(): JSX.Element {
  const [forms, setForms] = useState<FormEvaluationResponseType[]>([]); // Changed to array type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formList = await getEvaluationForms();
        setForms(formList);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchData();
  }, []);


  function dateConvert(date: string): string {
    const parts = date.split("T")[0].split("-");
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
}

  

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader
        title={'Evaluations Forms'}
        args={[       
             <Linker key={'create-link-consultant'} 
             size={'large'} 
             title={'add new Form'} 
             className={'gap-2 px-3'} 
             href={`evaluations/add`} icon={<LuPlusCircle className='flex' size={18} />} />,
      ]}
      />
      <div className='bg-primary-white flex flex-col p-7 pt-5 border-t-[2px] border-gray-200'>

      <div className='flex items-center justify-between mb-5  '>
          <div className='flex-1'>
            <SearchInput placeholder={'search Form Title'} className={'max-w-[300px]'} />
          </div>
          
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-4">
          {forms.map((form, index) => (
            <FormCard
              id={form.id}
              title={form.title}
              description={form.description}
              creatAt={  dateConvert(form.createdAt)}
              creatBy={form.createdBy}
              version={form.version}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
