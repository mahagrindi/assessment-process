import { type JSX } from 'react'
import { LuAirplay, LuArrowLeftToLine, LuCalendarCheck, LuCalendarDays, LuFileEdit, LuStickyNote, LuText, LuTimer, LuUserSquare } from 'react-icons/lu'
import { GoNumber } from 'react-icons/go'
import { MdOutlineFormatShapes } from 'react-icons/md'

import { redirect } from 'next/navigation'
import { Linker } from '@/ui/link'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'

import { AnimatedTooltip } from '@/components/animated-tooltip-images'
import { ContentHeader } from '@/components/content-header'
import { FIND } from '@/actions/cohort-server-actions'
import { cohortChallengeColumns } from '@/app/dashboard/programs/_data/cohort-challenge-datatable-header'

export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {
  if (!searchParams.id) {
    redirect('/dashboard/programs')
  }

  const cohort: CohortType = (await FIND(searchParams.id)) || {}

  return (
    <div className='h-full min-h-full w-full pb-6'>
      <ContentHeader
        title={cohort.cohortName || 'cohort'}
        args={[
          <Linker
            key={'back-to-cohorts'}
            href={`/dashboard/programs/detail?id=${searchParams.id}`}
            title={'Cancel'}
            size={'large'}
            variant='link'
            icon={<LuArrowLeftToLine />}
            className={'gap-2 px-3'}
          />,
          <Linker
            key={'edit-link-cohort'}
            title={'edit cohort'}
            href={`/dashboard/programs/cohorts/${cohort.cohortName.replaceAll(' ', '-')}?id=${cohort.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col gap-4 border-y-[2px] border-gray-200 p-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>details</h2>
          <p className='text-sm text-content-prompt mb-1'>The information that describes the cohort and its requirements.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuAirplay className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortName}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuCalendarCheck className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>From</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{new Date(cohort.cohortStartDate).toDateString()}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuCalendarDays className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>To</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{new Date(cohort.cohortEndDate!).toDateString()}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuTimer className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>Duration</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortDuration} weeks</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <GoNumber className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort challenges</p>
            </div>
            <div className='col-span-4'>
              <Chip title={cohort.challenges.length === 0 ? 'N/A' : `${cohort.challenges.length} challenges`} variant={cohort.challenges.length === 0 ? 'danger' : 'info'} size='small' />
            </div>
          </div>

          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuText className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort Description</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortDescription}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuUserSquare className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort program</p>
            </div>
            <div className='col-span-4'>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  {cohort.program.programPicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cohort.program.programPicture} alt={cohort.program.programName} className='flex w-10 h-10 rounded-full' />
                  ) : (
                    <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
                      <p>{cohort.program.programName[0]}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className='text-sm text-content-display capitalize'>{cohort.program.programName}</p>
                  <p className='text-xs text-content-prompt capitalize'>provider: {cohort.program.provider.programProviderName}</p>
                </div>
              </div>
            </div>
          </div>
          {/**/}
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 gap-4 p-6 mt-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>Expert consultants</h2>
          <p className='text-sm text-content-prompt mb-1'>The cohort challenges that are currently available for the cohort.</p>
        </div>
        <div className='col-span-4'>
          <AnimatedTooltip items={people} />
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>challenges</h2>
              <p className='text-sm text-content-prompt mb-1'>The cohort challenges that are currently available for the cohort.</p>
            </div>
            <div>
              <Linker
                title={'add new challenge'}
                href={`/dashboard/programs/cohorts/challenges/create?cohort=${cohort.id}`}
                size='large'
                icon={<LuStickyNote size={20} />}
                variant='primary'
                className={'gap-2 px-3'}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <DataTable<ChallengeType> rounded data={cohort.challenges?.reverse()} columns={cohortChallengeColumns} />
          </div>
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>Assessments</h2>
              <p className='text-sm text-content-prompt mb-1'>The assessment that will be held inside this assessment.</p>
            </div>
            <div>
              <Linker
                title={'New Assessment'}
                href={`/dashboard/programs/cohorts/challenges/create?cohort=${cohort.id}`}
                size='large'
                variant='info'
                icon={<MdOutlineFormatShapes size={20} />}
                className={'gap-2 px-3'}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <DataTable<ChallengeType> rounded data={[]} columns={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}

const people = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
  },
  {
    id: 2,
    name: 'Robert Johnson',
    designation: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Jane Smith',
    designation: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Tyler Durden',
    designation: 'Soap Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 6,
    name: 'Dora',
    designation: 'The Explorer',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
  },
]
