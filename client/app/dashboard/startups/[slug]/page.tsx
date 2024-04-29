'use client'

import type { JSX } from 'react'
import { LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

import { ContentHeader } from '@/components/content-header'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'startups'}
        args={[
          params.slug === 'create' ? (
            <Button key={'create-consultant-element'} variant={'primary'} title={'Save'} size={'large'} icon={<LuSave size={20} />} className={'gap-2 px-3'} />
          ) : (
            <Button key={'update-consultant-element'} variant={'secondary'} title={'Update'} size={'large'} icon={<LuFileEdit size={20} />} className={'gap-2 px-3'} />
          ),
        ]}
      />

      <div className='flex flex-col gap-4 p-6'>
        <Input label='password' required />

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 grid grid-cols-3 grid-rows-2 gap-4'>
          <div className='col-span-3'>
            <Input label='username' required />
          </div>
          <Input label='first name' required />
          <Input label='middle name' />
          <Input label='last name' required />
        </div>
      </div>
    </div>
  )
}
