'use client'

import { type JSX, useLayoutEffect, useState } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { TextArea } from '@/ui/textarea'
import { DropDown } from '@/ui/dropdown'
import { InputNumber } from '@/ui/storybook/input-number'
import { toast } from 'sonner'

import { ContentHeader } from '@/components/content-header'
import { formCohortDefaultValues, formCohortSchema } from '@/validation/form-cohort-validation'
import { FIND, POST, PUT } from '@/actions/cohort-server-actions'
import { Linker } from '@/ui/link'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { program: string; id: string } }): JSX.Element {
  const { push } = useRouter()
  const [programId, setProgramId] = useState<string>('')

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(formCohortSchema),
    defaultValues: formCohortDefaultValues,
  })

  useLayoutEffect(() => {
    if (params.slug === 'create') {
      setValue('cohortStatus', 'ONBOARDING')
    }
  }, [setValue, params.slug])

  useLayoutEffect(() => {
    if (params.slug !== 'create' && searchParams.id) {
      FIND(searchParams.id).then((data) => {
        reset(data)
        setProgramId(data.program.id!)
      })
    }
  }, [reset, searchParams.id, params.slug])

  return (
    <>
      <ContentHeader
        title={'Program Cohort'}
        args={[
          <Linker
            key={'back-to-cohorts'}
            href={`/dashboard/programs/detail?id=${searchParams.program}`}
            title={'Cancel'}
            size={'large'}
            variant='link'
            icon={<LuArrowLeftToLine />}
            className={'gap-2 px-3'}
          />,
          params.slug === 'create' ? (
            <Button
              key={'create-program-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  POST(data, searchParams.program)
                    .then(() => toast.success('Cohort has been Created'))
                    .then((res) => push(`/dashboard/programs/detail?id=${searchParams.program}`)),
                (err) => console.log(err)
              )}
            />
          ) : (
            <Button
              key={'update-program-element'}
              variant={'secondary'}
              title={'Update'}
              size={'large'}
              icon={<LuFileEdit size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  PUT(data)
                    .then(() => toast.success('Cohort has been Updated'))
                    .then(() => push(`/dashboard/programs/cohorts/detail?id=${searchParams.id}`)),
                (err) => console.log(err)
              )}
            />
          ),
        ]}
      />
      <div className='p-6'>
        <div className='col-span-4 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>The information that describes the cohort and its requirements.</p>
          </div>
          <Controller name='cohortName' control={control} render={({ field }) => <Input {...field} label='cohort name' error={errors.cohortName && errors.cohortName.message} />} />

          {params.slug !== 'create' && (
            <Controller
              name='cohortStatus'
              control={control}
              render={({ field }) => (
                <DropDown
                  required
                  label='select status'
                  placeholder={'Select status'}
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  data={[
                    { label: 'OnBoarding', value: 'ONBOARDING' },
                    { label: 'Starting', value: 'STARTING' },
                    { label: 'Ongoing', value: 'ONGOING' },
                    { label: 'Suspended', value: 'SUSPENDED' },
                    { label: 'Completed', value: 'COMPLETED' },
                  ]}
                  error={errors.cohortStatus && errors.cohortStatus.message}
                />
              )}
            />
          )}

          <Controller
            name='cohortDuration'
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                value={field.value}
                onChange={field.onChange}
                label='cohort duration'
                min={2}
                max={24}
                required
                hint={'duration for a cohort are calculated in weeks'}
                error={errors.cohortDuration && errors.cohortDuration.message}
              />
            )}
          />

          <div className='w-full grid grid-cols-2 gap-4'>
            <Controller
              name='cohortStartDate'
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value.substring(0, 10)} label='starting date' required type='date' error={errors.cohortStartDate && errors.cohortStartDate.message} />
              )}
            />
            <Controller
              name='cohortEndDate'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ? field.value.substring(0, 10) : undefined}
                  label='ending date'
                  type='date'
                  required
                  error={errors.cohortEndDate && errors.cohortEndDate.message}
                />
              )}
            />
          </div>

          <Controller
            name='cohortDescription'
            control={control}
            render={({ field }) => <TextArea {...field} label='program description' error={errors.cohortDescription && errors.cohortDescription.message} />}
          />
        </div>
      </div>
    </>
  )
}
