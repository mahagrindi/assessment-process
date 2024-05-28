'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { TextArea } from '@/ui/textarea'
import { Linker } from '@/ui/link'
import { toast } from 'sonner'
import { InputNumber } from '@/ui/storybook/input-number'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { ContentHeader } from '@/components/content-header'
import { FIND, POST, PUT } from '@/actions/criteria-server-actions'
import { formCriteriaDefaultValues, formCriteriaSchema } from '@/validation/form-criteria-validation'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string; sub: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formCriteriaSchema),
    defaultValues: formCriteriaDefaultValues,
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
          <Linker key={'back-to-axes'} href={'/dashboard/axes/criteria'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
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
                  POST(searchParams.sub, data)
                    .then(() => toast.success('Criteria created successfully'))
                    .then(() => push('/dashboard/axes/criteria'))
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
                    .then(() => toast.success('Criteria updated successfully'))
                    .then(() => push('/dashboard/axes/criteria'))
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
            <p className='text-sm text-content-prompt'>Fill in the form below to create a criteria or update an existing one.</p>
          </div>

          <div className='w-full grid gap-4'>
            <Controller
              name='axeSubCriteriaName'
              control={control}
              render={({ field }) => <Input {...field} label='Axe Title' required error={errors.axeSubCriteriaName && errors.axeSubCriteriaName.message} />}
            />

            <Controller
              name='axeSubCriteriaDescription'
              control={control}
              render={({ field }) => <TextArea {...field} label='Axe Description' error={errors.axeSubCriteriaDescription && errors.axeSubCriteriaDescription.message} />}
            />
          </div>
        </div>
        <div className='w-[35%] bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Status</h2>
            <p className='text-sm text-content-prompt'>By default, the question will be visible. You can change its status at any time.</p>
          </div>
          <div className='w-full grid gap-4'>
            <Controller
              name='axeSubCriteriaWeight'
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={1}
                  max={10}
                  required
                  label='Sub Axe Weight'
                  error={errors.axeSubCriteriaWeight && errors.axeSubCriteriaWeight.message}
                  hint='The weight for each Sub axe will help determ ine the score of its axe parent.'
                />
              )}
            />
            <Controller name='status' control={control} render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} label='Axe globally available' />} />
          </div>
        </div>
      </div>
    </div>
  )
}
