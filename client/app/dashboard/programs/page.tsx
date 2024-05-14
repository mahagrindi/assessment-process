import { type JSX, Suspense } from 'react'
import { LuPlus, LuSlidersHorizontal } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'
import { ServerSelect } from '@/ui/storybook/server-select'

import { ContentHeader } from '@/components/content-header'
import { SearchInput } from '@/components/content-data-table-search'

import { GET } from '@/actions/program-server-actions'
import { programColumns } from '@/app/dashboard/programs/_data/program-datatable-header'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; query: string; status: string } }): Promise<JSX.Element> {
  const program: ProgramResponseType = (await GET(searchParams.query, searchParams.status, Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'programs'}
        args={[<Linker key={'create-link-program'} title={'new program'} href={`/dashboard/programs/create`} size={'large'} icon={<LuPlus size={20} />} className={'gap-2 px-3'} />]}
      />

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search program'} className={'max-w-[300px]'} />
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
                { label: 'Boarding', value: 'BOARDING' },
                { label: 'Starting', value: 'STARTING' },
                { label: 'Ongoing', value: 'ONGOING' },
                { label: 'Suspended', value: 'SUSPENDED' },
                { label: 'Completed', value: 'COMPLETED' },
              ]}
              paramQuery={'status'}
            />
          </div>
        </div>
        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<ProgramType> data={program.content} columns={programColumns} paging={program} />
        </Suspense>
      </div>
    </div>
  )
}
