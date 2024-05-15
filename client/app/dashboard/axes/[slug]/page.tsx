'use client'

import { useLayoutEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { FileUpload } from '@/ui/file'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { ContentHeader } from '@/components/content-header'
import { FIND, POST, PUT } from '@/actions/axe-server-actions' // Assuming POST is a valid import
import { formAxeSchema } from '@/validation/form-axe-validation'
import { TextArea } from '@/ui/textarea'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formAxeSchema),
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND(searchParams.id).then((data) => {
        reset({ ...(({ createdAt, ...returnedData }) => returnedData)(data) })
      })
    }
  }, [searchParams.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'axe'}
        args={[
          params.slug === 'create' ? (
            <Button
              key={'create-axe-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => POST(data).then(() => push('/dashboard/axes')),
                (error) => console.log(error)
              )}
            />
          ) : (
            <Button
              key={'update-consultant-element'}
              variant={'secondary'}
              title={'Update'}
              size={'large'}
              icon={<LuFileEdit size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => PUT(data).then(() => {alert('Your changes have been successfully saved'); push('/dashboard/axes')}),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='flex flex-col gap-4 p-6'>
        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-4'>
          <div className='flex flex-row m-5 '>
            <div className='basis-full '>
              <div className='grid grid-rows gap-4'>
                <Controller
                  name={'axe_name'}
                  control={control}
                  render={({ field }) => <Input {...field} type='text' label='Axe Name' required error={errors?.axe_name && errors.axe_name.message} />}
                />
                <Controller
                  name={'description'}
                  control={control}
                  render={({ field }) => <TextArea {...field} label='Axe Description' required error={errors?.description && errors.description.message} />}
                />
                <Controller
                  name='visibility'
                  control={control}
                  render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={100} label='Axe enabled' required defaultChecked />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
