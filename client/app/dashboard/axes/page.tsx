import { JSX, Suspense } from 'react'
import { LuBriefcase, LuPlusCircle, LuSlidersHorizontal, LuStore } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'

import { consultantColumns } from '@/app/dashboard/consultants/_data/consultant-datatable-header'
import { SearchInput } from '@/components/content-data-table-search'
import { ServerSelect } from '@/ui/storybook/server-select'
import { AxeColumns } from './_data/axe-datatable-header'
import { GET } from '@/actions/axe-server-actions'

export default async function Page({ searchParams,}: {
  searchParams: { page: string; size: string; sort: string; dir: string; query: string; visibility: boolean;  }
}): Promise<JSX.Element> {
  const axes: AxeResponseType =  (await GET(searchParams.query, searchParams.visibility,    Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}
 
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Axes'}
        args={[<Linker key={'create-link-consultant-element'} title={'add new axe'} href={`/dashboard/axes/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-2 px-3'} />]}
      />

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search axe'} className={'max-w-[300px]'} />
          </div>
          <div className='flex items-center gap-2'>
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuSlidersHorizontal size={20} />
                  <p className='text-sm font-medium'>visibility</p>
                </div>
              }
              classname={'min-w-[150px]'}
              data={[
                { label: 'Active', value: 'true' },
                { label: 'Disabled', value: 'false' },
              ]}
              paramQuery={'visibility'}
            />
           
             
          </div>
        </div>
        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<AxeType> data={axes.content} columns={AxeColumns} paging={axes} />
        </Suspense>
      </div>
    </div>
  )
}
