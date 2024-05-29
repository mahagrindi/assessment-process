import { type JSX } from 'react'
import { LuArrowLeftToLine, LuCalendarCheck, LuDot, LuFileEdit, LuStickyNote, LuText } from 'react-icons/lu'
import { GoNumber } from 'react-icons/go'

import { redirect } from 'next/navigation'
import { Linker } from '@/ui/link'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'
import { FIND } from '@/actions/axe-server-actions'
import { subAxeColumns } from '@/app/dashboard/axes/_data/subaxe-datatable-header'

export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {
  if (!searchParams.id) {
    redirect('/dashboard/axes')
  }

  const axe: AxeType = (await FIND(searchParams.id)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={axe.axeName || 'axe'}
        args={[
          <Linker key={'back-to-axes'} href={'/dashboard/axes'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          <Linker
            key={'edit-link-axe'}
            title={'edit axe'}
            href={`/dashboard/axes/${axe.axeName.replaceAll(' ', '-')}?id=${axe.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>{axe.axeName} Axe Details</h2>
              <p className='text-sm text-content-prompt mb-1'>The information that describes the axe and its requirements.</p>
              <div className='flex items-center gap-2'>
                <p className='text-sm text-content-prompt capitalize'>{axe.createdAt?.slice(0, 10)}</p>
                <LuDot size={20} />
                <div className='capitalize'>
                  <Chip title={axe.status ? 'Enabled' : 'Hidden'} size={'small'} variant={axe.status ? 'success' : 'danger'} />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuCalendarCheck className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Created Date</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{new Date(axe.createdAt!).toDateString()}</p>
              </div>
            </div>
            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <GoNumber className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>
                  Branches <span className='text-xs text-gray-400'>(sub axes)</span>
                </p>
              </div>
              <div className='col-span-4'>
                <Chip title={axe.axeSubs.length === 0 ? 'N/A' : `${axe.axeSubs.length} Sub Axes`} variant={axe.axeSubs.length === 0 ? 'danger' : 'info'} size='small' />
              </div>
            </div>

            <div className='grid grid-cols-5'>
              <div className='col-span-1 flex items-center gap-2'>
                <LuText className='text-gray-400' size={20} />
                <p className='text-sm text-content-prompt capitalize font-[500]'>Axe Description</p>
              </div>
              <div className='col-span-4'>
                <p className='text text-content-display capitalize'>{axe.axeDescription}</p>
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
              <h2 className='text-xl font-bold text-content-display capitalize'>
                Branches <span className='text-xs text-gray-400'>(sub axes)</span>
              </h2>
              <p className='text-sm text-content-prompt mb-1'>The sub-axes that are part of this axe. These sub-axes will contain criteria we will be using in the evaluation.</p>
            </div>
            <div>
              <Linker title={'create new branch'} href={`/dashboard/axes/detail/sub-axes?axe=${axe.id}`} size='large' icon={<LuStickyNote size={20} />} className={'gap-2 px-3'} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <DataTable<AxeSubType> rounded data={axe.axeSubs} columns={subAxeColumns} />
          </div>
        </div>
      </div>
    </div>
  )
}
