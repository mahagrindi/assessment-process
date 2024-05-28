import { type JSX, Suspense } from 'react'
import { LuCheck, LuFile, LuList, LuSlidersHorizontal } from 'react-icons/lu'
import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'
import { ServerSelect } from '@/ui/storybook/server-select'
import { ContentHeader } from '@/components/content-header'
import { SearchInput } from '@/components/content-data-table-search'

import { GET, GET_SUB_LIST } from '@/actions/criteria-server-actions'
import { criteriaColumns } from '@/app/dashboard/axes/_data/criteria-datatable-header'
import { FilterOptions } from '@/components/filter-options'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; query: string; name: string; status: string } }): Promise<JSX.Element> {
  const criterias: AxeSubCriteriaResponseType =
    (await GET(searchParams.name, searchParams.query, searchParams.status, Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}

  const subs: AxeSubType[] = (await GET_SUB_LIST()) || []

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Criteria'}
        args={
          searchParams.name
            ? [
                <Linker
                  size='large'
                  variant='primary'
                  key={'create-criteria'}
                  className={'gap-2 px-3'}
                  title={'create new cohort'}
                  icon={<LuFile size={20} />}
                  href={`/dashboard/axes/criteria/create?sub=${subs.find((elem) => elem.axeSubName === searchParams.name)?.id}`}
                />,
              ]
            : []
        }
      />

      {(searchParams.name || searchParams.status || searchParams.query) && (
        <div className='px-6 mb-6'>
          <FilterOptions
            filter={[
              { name: 'query', option: searchParams.query },
              { name: 'name', option: searchParams.name },
              { name: 'status', option: searchParams.status },
            ]}
          />
        </div>
      )}

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search axe'} className={'max-w-[300px]'} />
          </div>
          <div className='flex items-center gap-2'>
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuList size={20} />
                  <p className='text-sm font-medium'>Sub Axe</p>
                </div>
              }
              classname='min-w-[225px]'
              data={subs.map((el) => ({
                label: (
                  <p className='capitalize flex items-end gap-1'>
                    {el.axeSubName}
                    <span className='text-[11px]'>({el.axe.axeName})</span>
                  </p>
                ),
                value: el.axeSubName,
              }))}
              paramQuery={'name'}
            />
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

        {!searchParams.name && (
          <div className='w-full bg-blue-100/20 border-y-2 border-blue-600 p-4' role='alert'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <span className='inline-flex justify-center items-center size-8 rounded-full border-4 border-blue-100 bg-blue-200'>
                  <LuCheck size={16} className='text-primary-background' />
                </span>
              </div>
              <div className='ms-3'>
                <h3 className='text-gray-800 font-semibold dark:text-white capitalize'>Adding new criteria!</h3>
                <p className='text-sm text-gray-700'>To add a new criteria all you have to do is filter buy sub axe.</p>
              </div>
            </div>
          </div>
        )}

        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<AxeSubCriteriaType> data={criterias.content} columns={criteriaColumns} paging={criterias} />
        </Suspense>
      </div>
    </div>
  )
}
