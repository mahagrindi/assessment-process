import { type JSX, Suspense } from 'react'

import { ContentHeader } from '@/components/content-header'
import { GET, GET_PROGRAMS } from '@/actions/cohort-server-actions'
import { DataTable } from '@/ui/storybook/data-table'
import { cohortColumns } from '@/app/dashboard/programs/_data/cohort-datatable-header'
import { ServerSelect } from '@/ui/storybook/server-select'
import { LuFile, LuFolderCog } from 'react-icons/lu'
import { FilterOptions } from '@/components/filter-options'
import { Linker } from '@/ui/link'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; program: string } }): Promise<JSX.Element> {
  const cohorts: CohortResponseType = (await GET(Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir, searchParams.program)) || {}
  const programs: ProgramType[] = (await GET_PROGRAMS()) || []

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title={'all cohorts'} />

      {searchParams.program && (
        <div className='px-6 mb-6'>
          <FilterOptions
            filter={[
              {
                name: 'program',
                option: programs.find((program) => program.id === searchParams.program)?.programName!,
              },
            ]}
          />
        </div>
      )}

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div>
            <Suspense fallback='loading...'>
              <ServerSelect
                placeholder={
                  <div className='flex items-center gap-2 capitalize text-gray-400'>
                    <LuFolderCog size={20} />
                    <p className='text-sm font-medium'>program</p>
                  </div>
                }
                classname={'min-w-[200px]'}
                data={programs.map((program) => ({ label: <p className='capitalize'>{program.programName}</p>, value: program.id! }))}
                paramQuery={'program'}
              />
            </Suspense>
          </div>
          <div className='flex items-center gap-2'>
            {searchParams.program && [
              <Linker
                key={'create-cohort-program'}
                title={'create new cohort'}
                variant='primary'
                href={`/dashboard/programs/cohorts/create?program=${searchParams.program}`}
                icon={<LuFile size={20} />}
                className={'gap-2 px-2'}
              />,
            ]}
          </div>
        </div>
        <Suspense key={searchParams.program} fallback='loading...'>
          <DataTable<CohortType> data={cohorts.content} columns={cohortColumns} paging={cohorts} />
        </Suspense>
      </div>
    </div>
  )
}
