'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { toast } from 'sonner'
import { Input } from '@/ui/input'
import { Linker } from '@/ui/link'
import { Switch } from '@/ui/switch'
import { Button } from '@/ui/button'
import { TextArea } from '@/ui/textarea'
import { InputNumber } from '@/ui/storybook/input-number'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { ContentHeader } from '@/components/content-header'
import { FIND, POST, PUT } from '@/actions/subaxe-server-actions'
import { formSubAxeDefaultValues, formSubAxeSchema } from '@/validation/form-subaxe-validation'

export default function Page({ searchParams }: { searchParams: { axe: string; id: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formSubAxeSchema),
    defaultValues: formSubAxeDefaultValues,
  })

  useLayoutEffect(() => {
    if (searchParams.id) {
      FIND(searchParams.id).then((data) => reset(data))
    }
  }, [searchParams.id, reset])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Branch'}
        subtitle={''}
        args={[
          <Linker key={'back-to-axes'} href={`/dashboard/axes/detail?id=${searchParams.axe}`} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          !searchParams.id ? (
            <Button
              key={'create-axe-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  POST(searchParams.axe, data)
                    .then(() => toast.success('Branch (sub axe) created successfully.'))
                    .then(() => push(`/dashboard/axes/detail?id=${searchParams.axe}`))
                    .catch(() => toast.error('An error occurred while creating a sub axe.')),
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
                  PUT(searchParams.axe, data)
                    .then(() => toast.success('Branch (Sub Axe) updated successfully'))
                    .then(() => push(`/dashboard/axes/detail?id=${searchParams.axe}`))
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
            <p className='text-sm text-content-prompt'>Fill in the form below to create a sub axe or update an existing one.</p>
          </div>

          <div className='w-full grid gap-4'>
            <Controller name='axeSubName' control={control} render={({ field }) => <Input {...field} label='Sub Axe Title' required error={errors.axeSubName && errors.axeSubName.message} />} />

            <Controller
              name='axeSubDescription'
              control={control}
              render={({ field }) => <TextArea {...field} label='Sub Axe Description' error={errors.axeSubDescription && errors.axeSubDescription.message} />}
            />
          </div>
        </div>
        <div className='w-[35%] bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Status</h2>
            <p className='text-sm text-content-prompt'>By default, the sub axe will be hidden. You can change its status at any time.</p>
          </div>
          <div className='w-full grid gap-4'>
            <Controller
              name='axeSubWeight'
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={1}
                  max={10}
                  required
                  label='Sub Axe Weight'
                  error={errors.axeSubWeight && errors.axeSubWeight.message}
                  hint='The weight for each Sub axe will help determ ine the score of its axe parent.'
                />
              )}
            />

            <Controller name='status' control={control} render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} label='Sub Axe Visibility' />} />
          </div>
        </div>
      </div>
    </div>
  )
}
