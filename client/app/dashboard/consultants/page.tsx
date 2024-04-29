import { JSX, Suspense } from 'react'
import { LuBriefcase, LuPlusCircle, LuSlidersHorizontal, LuStore } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'

import { consultantColumns } from '@/app/dashboard/consultants/_data/consultant-datatable-header'
import { GET, GET_DEPARTMENT, GET_JOB_TITLES } from '@/actions/consultant-server-actions'
import { SearchInput } from '@/components/content-data-table-search'
import { ServerSelect } from '@/ui/storybook/server-select'

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; size: string; sort: string; dir: string; query: string; title: string; status: string; dep: string }
}): Promise<JSX.Element> {
  const consultant: ConsultantResponseType =
    (await GET(searchParams.query, searchParams.title, searchParams.status, searchParams.dep, Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}
  const departments: string[] = (await GET_DEPARTMENT()) || []
  const jobTitles: string[] = (await GET_JOB_TITLES()) || []

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[<Linker key={'create-link-consultant-element'} title={'add new'} href={`/dashboard/consultants/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-2 px-3'} />]}
      />

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search consultant'} className={'max-w-[300px]'} />
          </div>
          <div className='flex items-center gap-2'>
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuSlidersHorizontal size={20} />
                  <p className='text-sm font-medium'>Status</p>
                </div>
              }
              classname={'min-w-[150px]'}
              data={[
                { label: 'Active', value: 'true' },
                { label: 'Disabled', value: 'false' },
              ]}
              paramQuery={'status'}
            />
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuBriefcase size={20} />
                  <p className='text-sm font-medium'>job titles</p>
                </div>
              }
              classname={'min-w-[200px]'}
              data={jobTitles.map((title) => ({ label: title, value: title }))}
              paramQuery={'title'}
            />
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuStore size={20} />
                  <p className='text-sm font-medium'>department</p>
                </div>
              }
              paramQuery={'dep'}
              classname={'min-w-[250px]'}
              data={departments.map((dep) => ({ label: dep, value: dep }))}
            />
          </div>
        </div>
        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<ConsultantType> data={consultant.content} columns={consultantColumns} paging={consultant} />
        </Suspense>
      </div>
    </div>
  )
}
