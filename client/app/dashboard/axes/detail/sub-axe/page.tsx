'use client'
import { JSX, Suspense } from 'react'

import { ContentHeader } from '@/components/content-header'

import { Linker } from '@/ui/link'
import { LuFileEdit, LuStickyNote } from 'react-icons/lu'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'
import { FIND_SUBAXE } from '@/actions/sub-axe-server-actions'
import { CriteriaColumns } from '@/app/dashboard/axes/_data/criteria-datatable-header'

export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {
  const subaxes: SubAxeType = await FIND_SUBAXE(searchParams.id)

  function dateConvert(date: string): string {
    const parts = date.split('T')[0].split('-')
    return `${parts[0]}/${parts[1]}/${parts[2]}`
  }

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={subaxes?.subaxe_name || 'Sub-Axe'}
        args={[
          <Linker
            key={'edit-link-axe'}
            title={'edit axe'}
            href={`/dashboard/axes/detail/${subaxes?.subaxe_name}?idSubAxe=${subaxes?.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
          <p className='text-sm text-content-prompt mb-1'>The information that describes the Sub-axe and its requirements.</p>
        </div>
        <div>
          <div className='grid grid-cols-3 gap-2 mt-2'>
            <div>
              <p className='text-sm text-content-disabled'>Sub-Axe Name</p>
              <p className='text-sm text-content-display capitalize'>{subaxes?.subaxe_name}</p>
            </div>

            <div>
              <p className='text-sm text-content-disabled'>Axe visibility </p>
              <p className='text-sm text-content-display capitalize'>
                <div className=' mt-1 w-[82px]'>{subaxes?.visibility ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Disabled'} variant={'danger'} />}</div>,
              </p>
            </div>
            <div>
              <p className='text-sm text-content-disabled'>Axe creation Date</p>
              <p className='text-sm text-content-display capitalize'>{new Date(subaxes?.createdAt!).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>Criterias</h2>
              <p className='text-sm text-content-prompt mb-1'>you can view the Criterias of the sub-axe {subaxes?.subaxe_name} and manage them.</p>
            </div>
            <div>
              <Linker title={'new Criterias'} href={`/dashboard/axes/detail/sub-axe/create?id=${subaxes?.id}`} size='large' icon={<LuStickyNote size={20} />} className={'gap-2 px-3'} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Suspense fallback='loading...'>
              <DataTable<CriteriaType> rounded data={subaxes?.criteriaList || []} columns={CriteriaColumns} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
