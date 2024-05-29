import { type JSX } from 'react'
import { LuAirplay, LuArrowLeftToLine, LuCalendarCheck, LuCalendarDays, LuDot, LuExternalLink, LuFileEdit, LuStickyNote, LuText, LuTimer, LuUserSquare } from 'react-icons/lu'
import { GoNumber } from 'react-icons/go'

import { redirect } from 'next/navigation'
import { Linker } from '@/ui/link'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'
import { FIND } from '@/actions/program-server-actions'
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
          <Linker key={'back-to-programs'} href={'/dashboard/programs'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          <Linker
            key={'edit-link-program'}
            title={'edit program'}
            href={`/dashboard/programs/${program.programName.replaceAll(' ', '-')}?id=${program.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={program.programPicture} alt={program.programName} className='w-11 h-11 object-cover rounded-full border-[2px]' />
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>{program.programName} Program Details</h2>
              <p className='text-sm text-content-prompt mb-1'>The information that describes the program and its requirements.</p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <p className='text-sm text-content-prompt capitalize'>{program.createdAt.slice(0, 10)}</p>
            <LuDot size={20} />
            <div className='capitalize'>
              {(() => {
                switch (program.programStatus) {
                  case 'STARTING':
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='default' />
                  case 'ONBOARDING':
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='content' />
                  case 'ONGOING':
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='info' />
                  case 'SUSPENDED':
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='warning' />
                  case 'COMPLETED':
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='danger' />
                  default:
                    return <Chip title={program.programStatus.toLowerCase()} size={'small'} variant='default' />
                }
              })()}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuAirplay className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Program Industry</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{program.programIndustry}</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuCalendarCheck className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>From</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{new Date(program.programStartDate).toDateString()}</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuCalendarDays className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>To</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{new Date(program.programEndDate!).toDateString()}</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuTimer className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Duration</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{program.programEstimatedDuration} months</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <GoNumber className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Program cohorts</p>
              </div>
              <div className='col-span-4'>
                <Chip title={program.cohorts.length === 0 ? 'N/A' : `${program.cohorts.length} cohorts`} variant={program.cohorts.length === 0 ? 'danger' : 'info'} size='small' />
              </div>
            </div>

            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuText className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Program Description</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{program.programDescription}</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuUserSquare className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Program provider</p>
              </div>
              <div className='col-span-4'>
                <div className='flex flex-row items-center gap-2'>
                  <div>
                    {program.provider.programProviderLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={program.provider.programProviderLogo} alt={program.provider.programProviderName} className='flex w-10 h-10 rounded-full' />
                    ) : (
                      <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
                        <p>{program.provider.programProviderName[0]}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-content-display capitalize'>{program.provider.programProviderName}</p>
                    <a target={'_blank'} href={program.provider.programProviderWebsite} className='flex items-center gap-1'>
                      <p className='text-xs text-accent-link capitalize'>link</p>
                      <LuExternalLink size={14} className='text-accent-link' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/**/}
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
            <DataTable<CohortType> rounded data={program.cohorts?.reverse()} columns={programCohortColumns} />
          </div>
        </div>
      </div>
    </div>
  )
}
