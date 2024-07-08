import { JSX, Suspense } from 'react'

import { LuFile, LuSlidersHorizontal } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { SearchInput } from '@/components/content-data-table-search'
import { ServerSelect } from '@/ui/storybook/server-select'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'
import { GET } from '@/actions/form-server-actions'
import { FilterOptions } from '@/components/filter-options'
import { formColumns } from '@/app/dashboard/evaluations/data/form-datatable-header'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; query: string; status: string } }): Promise<JSX.Element> {
  const evaluations: ForumResponseType = await GET(searchParams.query, searchParams.status, Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Evaluation Forums'}
        args={[<Linker size='large' variant='primary' key={'create-criteria'} className={'gap-2 px-3'} title={'new Forum'} icon={<LuFile size={20} />} href={`/dashboard/evaluations/create`} />]}
      />

      {(searchParams.query || searchParams.status) && (
        <div className='px-6 mb-6'>
          <FilterOptions
            filter={[
              { name: 'query', option: searchParams.query },
              { name: 'status', option: searchParams.status },
            ]}
          />
        </div>
      )}

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search forum'} className={'max-w-[300px]'} />
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
              paramQuery={'status'}
            />
          </div>
        </div>

        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<ForumType> data={evaluations.content} columns={formColumns} paging={evaluations} />
        </Suspense>
      </div>
    </div>
  )
}
