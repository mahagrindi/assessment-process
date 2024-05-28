'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { TextArea } from '@/ui/textarea'
import { Linker } from '@/ui/link'
import { toast } from 'sonner'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { ContentHeader } from '@/components/content-header'
import { FIND, POST, PUT } from '@/actions/axe-server-actions' // Assuming POST is a valid import
import { formAxeDefaultValues, formAxeSchema } from '@/validation/form-axe-validation'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formAxeSchema),
    defaultValues: formAxeDefaultValues,
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND(searchParams.id).then((data) => {
        reset(data)
      })
    }
  }, [params.slug, searchParams.id, reset])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'axe'}
        args={[
          <Linker key={'back-to-axes'} href={'/dashboard/axes'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          params.slug === 'create' ? (
            <Button
              key={'create-axe-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  POST(data)
                    .then(() => toast.success('Axe created successfully'))
                    .then(() => push('/dashboard/axes'))
                    .catch(() => toast.error('An error occurred while updating the axe')),
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
                (data) =>
                  PUT(data)
                    .then(() => toast.success('Axe updated successfully'))
                    .then(() => push('/dashboard/axes'))
                    .catch(() => toast.error('An error occurred while updating the axe')),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='flex items-start gap-4 p-6'>
        <div className='flex-1 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>Fill in the form below to create a new axe or update an existing one.</p>
          </div>

          <div className='w-full grid gap-4'>
            <Controller name='axeName' control={control} render={({ field }) => <Input {...field} label='Axe Title' required error={errors.axeName && errors.axeName.message} />} />

            <Controller
              name='axeDescription'
              control={control}
              render={({ field }) => <TextArea {...field} label='Axe Description' error={errors.axeDescription && errors.axeDescription.message} />}
            />
          </div>
        </div>
        <div className='w-[35%] bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Status</h2>
            <p className='text-sm text-content-prompt'>By default, the axe will be hidden. You can change the status of the axe at any time.</p>
          </div>
          <div className='w-full'>
            <Controller name='status' control={control} render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} label='Axe globally available' />} />
          </div>
        </div>
      </div>
    </div>
  )
}
