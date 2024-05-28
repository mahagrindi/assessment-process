'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { FileUpload } from '@/ui/file'
import { TextArea } from '@/ui/textarea'
import { DropDown } from '@/ui/dropdown'
import { InputNumber } from '@/ui/storybook/input-number'
import { Linker } from '@/ui/link'

import { ContentHeader } from '@/components/content-header'
import { formProgramDefaultValues, formProgramSchema } from '@/validation/form-program-validation'
import { FIND, POST, PUT } from '@/actions/program-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(formProgramSchema),
    defaultValues: formProgramDefaultValues,
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND(searchParams.id).then((data) => reset(data))
    }
  }, [searchParams.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (params.slug === 'create') {
      setValue('programStatus', 'ONBOARDING')
    }
  }, [params.slug, setValue])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'programs'}
        args={[
          <Linker key={'back-to-programs'} href={'/dashboard/programs'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          params.slug === 'create' ? (
            <Button
              key={'create-program-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => POST(data).then(() => push('/dashboard/programs')),
                (error) => console.log(error)
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
                (data) => PUT(data).then(() => push('/dashboard/programs')),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='grid grid-cols-6 gap-4 p-6'>
        <div className='col-span-4 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>The information that describes the program and its requirements.</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <Controller
              name='programPicture'
              control={control}
              render={({ field }) => (
                <FileUpload
                  label='upload program logo'
                  value={field.value ? field.value : undefined}
                  onChange={(e) => field.onChange(e)}
                  error={errors.programPicture && errors.programPicture.message}
                />
              )}
            />

            {params.slug !== 'create' && (
              <Controller
                name='programStatus'
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
                    error={errors.programStatus && errors.programStatus.message}
                  />
                )}
              />
            )}

            <Controller
              name='programName'
              control={control}
              render={({ field }) => <Input {...field} type='tel' label='program name' required error={errors.programName && errors.programName.message} />}
            />
            <Controller
              name='programIndustry'
              control={control}
              render={({ field }) => <Input {...field} label='program industry' required error={errors.programIndustry && errors.programIndustry.message} />}
            />
            <Controller
              name='programDescription'
              control={control}
              render={({ field }) => <TextArea {...field} label='program description' required error={errors.programDescription && errors.programDescription.message} />}
            />

            <Controller
              name='programEstimatedDuration'
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  label='program duration'
                  min={1}
                  max={50}
                  required
                  hint={'duration for a program are calculated in months'}
                  error={errors.programEstimatedDuration && errors.programEstimatedDuration.message}
                />
              )}
            />

            <div className='w-full grid grid-cols-2 gap-4'>
              <Controller
                name='programStartDate'
                control={control}
                render={({ field }) => (
                  <Input {...field} value={field.value.substring(0, 10)} label='starting date' required type='date' error={errors.programStartDate && errors.programStartDate.message} />
                )}
              />
              <Controller
                name='programEndDate'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ? field.value.substring(0, 10) : undefined}
                    label='ending date'
                    type='date'
                    required
                    error={errors.programEndDate && errors.programEndDate.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className='col-span-2 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Provider</h2>
            <p className='text-sm text-content-prompt'>The provider is the organization that offers the program.</p>
          </div>
          <Controller
            name='provider.programProviderName'
            control={control}
            render={({ field }) => <Input {...field} label='provider name' required error={errors.provider?.programProviderName && errors.provider.programProviderName.message} />}
          />
          <Controller
            name='provider.programProviderWebsite'
            control={control}
            render={({ field }) => (
              <Input {...field} label='provider website' placeholder={'https://...'} error={errors.provider?.programProviderWebsite && errors.provider.programProviderWebsite.message} />
            )}
          />
          <Controller
            name='provider.programProviderLogo'
            control={control}
            render={({ field }) => (
              <FileUpload
                label='provider logo'
                value={field.value ? field.value : undefined}
                onChange={(e) => field.onChange(e)}
                error={errors?.provider?.programProviderLogo && errors.provider.programProviderLogo.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
