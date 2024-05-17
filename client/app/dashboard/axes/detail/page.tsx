'use client'
import { JSX, Suspense } from 'react'

import { ContentHeader } from '@/components/content-header'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { MdAddCircleOutline, MdCancel } from 'react-icons/md'
import { Button } from '@/ui/button'
import { FIND } from '@/actions/axe-server-actions'
import { Linker } from '@/ui/link'
import { LuFileEdit, LuStickyNote } from 'react-icons/lu'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'
import { SubAxeColumns } from '../_data/sub-axe-datatable-header'

export default async function Page({ searchParams }: { searchParams: { q: string } }): Promise<JSX.Element> {
  const axes: AxeType = (await FIND(searchParams.q)) 

  function dateConvert(date: string): string {
    const parts = date.split('T')[0].split('-')
    return `${parts[0]}/${parts[1]}/${parts[2]}`
  }

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={axes?.axe_name || 'Axe'}
        args={[<Linker key={'edit-link-axe'} title={'edit axe'} href={`/dashboard/axes/${axes?.axe_name}?id=${axes?.id}`} size={'large'} icon={<LuFileEdit size={20} />} className={'gap-2 px-3'} />]}
      />

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
          <p className='text-sm text-content-prompt mb-1'>The information that describes the axe and its requirements.</p>
        </div>
        <div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <p className='text-sm text-content-disabled'>Axe Name</p>
              <p className='text-sm text-content-display capitalize'>{axes?.axe_name}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Axe Description</p>
              <p className='text-sm text-content-display capitalize'>{axes?.description}</p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Axe visibility </p>
              <p className='text-sm text-content-display capitalize'>
                <div className=' mt-1 w-[82px]'>{axes?.visibility ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Disabled'} variant={'danger'} />}</div>,
              </p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Axe creation Date</p>
              <p className='text-sm text-content-display capitalize'>{new Date(axes?.createdAt!).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>Sub-axes</h2>
              <p className='text-sm text-content-prompt mb-1'>you can view the sub-axes of the axe {axes?.axe_name} and manage them.</p>
            </div>
            <div>
              <Linker title={'new sub-axe'} href={`/dashboard/axes/detail/create?id=${axes?.id}`} size='large' icon={<LuStickyNote size={20} />} className={'gap-2 px-3'} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Suspense fallback='loading...'>
              <DataTable<SubAxeType> rounded data={axes?.subAxes || []} columns={SubAxeColumns} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
