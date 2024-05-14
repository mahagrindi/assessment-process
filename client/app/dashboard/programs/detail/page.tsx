import { type JSX } from 'react'
import { LuFileEdit, LuStickyNote } from 'react-icons/lu'

import { redirect } from 'next/navigation'
import { Linker } from '@/ui/link'

import { ContentHeader } from '@/components/content-header'
import { FIND } from '@/actions/program-server-actions'
import { DataTable } from '@/ui/storybook/data-table'
import { programCohortColumns } from '@/app/dashboard/programs/_data/program-cohort-datatable-header'

export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {
  if (!searchParams.id) {
    redirect('/dashboard/programs')
  }

  const program = (await FIND(searchParams.id)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={program.programName || 'program'}
        args={[
          <Linker
            key={'edit-link-program'}
            title={'edit program'}
            href={`/dashboard/programs/${program.programName}?id=${program.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
          <p className='text-sm text-content-prompt mb-1'>The information that describes the program and its requirements.</p>
        </div>
        <div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <p className='text-sm text-content-disabled'>Program Image</p>
              <img src={program.programPicture} alt={program.programName} className='w-12 h-12 object-cover rounded' />
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Name</p>
              <p className='text-sm text-content-display capitalize'>{program.programName}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Description</p>
              <p className='text-sm text-content-display capitalize'>{program.programDescription}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Status</p>
              <p className='text-sm text-content-display capitalize'>{program.programStatus}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Industry</p>
              <p className='text-sm text-content-display capitalize'>{program.programIndustry}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Start Date</p>
              <p className='text-sm text-content-display capitalize'>{program.programStartDate.slice(0, 10)}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program Duration</p>
              <p className='text-sm text-content-display capitalize'>{program.programEstimatedDuration}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Program End Date</p>
              <p className='text-sm text-content-display capitalize'>{program.programEndDate?.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>cohorts</h2>
              <p className='text-sm text-content-prompt mb-1'>you can view the cohorts of this program and manage them.</p>
            </div>
            <div>
              <Linker title={'new program cohort'} href={`/dashboard/programs/cohorts/create?program=${program.id}`} size='large' icon={<LuStickyNote size={20} />} className={'gap-2 px-3'} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <DataTable<CohortType>
              rounded
              data={program.cohorts?.sort((a, b) => (new Date(a.cohortStartDate).toLocaleDateString() > new Date(b.cohortStartDate).toLocaleDateString() ? -1 : 1))}
              columns={programCohortColumns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
