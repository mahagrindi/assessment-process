'use client'

import { type ChangeEvent, type JSX, useLayoutEffect, useState } from 'react'
import { LuFileEdit, LuSave, LuX } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { FileUpload } from '@/ui/file'
import { DropDown } from '@/ui/dropdown'
import { TextArea } from '@/ui/textarea'

import { ContentHeader } from '@/components/content-header'
import { formStartupDefaultValues, formStartupSchema } from '@/validation/form-startup-validation'
import { FIND, GET_ACTIVITY_SECTOR, POST, PUT } from '@/actions/startup-server-actions'
import { toast } from 'sonner'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()
  const [founder, setFounder] = useState<string>('')
  const [activityList, setActivityList] = useState<{ label: string; value: string }[]>([])

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(formStartupSchema),
    defaultValues: formStartupDefaultValues,
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create' && searchParams.id) {
      FIND(searchParams.id).then((data) => {
        reset(data)
        console.log({ ...(({ evaluations, ...c }) => c)(data) })
      })
    }
  }, [reset, searchParams.id, params.slug])

  useLayoutEffect(() => {
    GET_ACTIVITY_SECTOR().then((data) => {
      setActivityList(data.map((el) => ({ label: el, value: el })))
    })
  }, [])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'startup Form'}
        args={[
          params.slug === 'create' ? (
            <Button
              key={'create-consultant-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  POST({ ...data, startupCreatedAt: new Date().getFullYear().toString() })
                    .then(() => toast.success('Startup created successfully'))
                    .then(() => push('/dashboard/startups'))
                    .catch(() => toast.error('There was an error creating the startup, please try again.')),
                (values) => toast.error("There's an error in the form, please check it.")
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
                  PUT({ ...data, startupCreatedAt: new Date().getFullYear().toString() })
                    .then(() => toast.success('Startup updated successfully'))
                    .then(() => push('/dashboard/startups'))
                    .catch(() => toast.error('There was an error updating the startup, please try again.')),
                (values) => toast.error("There's an error in the form, please check it.")
              )}
            />
          ),
        ]}
      />

      <div className='grid grid-cols-7 p-6 gap-4'>
        <div className='col-span-5 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>The information that describes a startup.</p>
          </div>
          <Controller name='startupName' control={control} render={({ field }) => <Input {...field} label='Startup Name' required error={errors.startupName?.message} />} />

          <Controller
            name='startupActivitySector'
            control={control}
            render={({ field }) => (
              <DropDown
                required
                label='Select a Sector'
                placeholder={'Select a Sector'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                data={activityList}
                error={errors.startupActivitySector && errors.startupActivitySector.message}
              />
            )}
          />

          <Controller name='startupDescription' control={control} render={({ field }) => <TextArea {...field} label='Startup Description' required error={errors.startupDescription?.message} />} />

          <Controller
            name='startupLogo'
            control={control}
            render={({ field }) => (
              <FileUpload label='upload program logo' value={field.value ? field.value : undefined} onChange={(e) => field.onChange(e)} error={errors.startupLogo && errors.startupLogo.message} />
            )}
          />
        </div>
        <div className='col-span-2 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Label</h2>
            <p className='text-sm text-content-prompt'>Define When a startup got {"it's"} label.</p>
          </div>
          <Controller
            name='startupLabelDate'
            control={control}
            render={({ field }) => (
              <Input {...field} label='Label Date' {...field} value={field.value ? field.value.substring(0, 10) : undefined} type='date' error={errors.startupLabelDate?.message} />
            )}
          />
          <Controller
            name='startupFounders'
            control={control}
            render={({ field }) => {
              const foundersArray = field.value ? field.value.split(',') : []
              return (
                <div className='w-full flex flex-col gap-1'>
                  <label className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
                    <span>Startup Founders</span>
                  </label>
                  <div className='w-full flex items-start gap-2'>
                    <div className='flex-1'>
                      <Input
                        value={founder}
                        required
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setFounder(event.target.value)}
                        error={errors.startupFounders?.message}
                        hint="Add a founder and press 'Add' to add it to the list."
                      />
                    </div>
                    <Button
                      title='Add'
                      className='w-fit'
                      disabled={!founder}
                      onClick={() => {
                        const updatedFounders = field.value ? `${field.value},${founder}` : founder
                        field.onChange(updatedFounders)
                        setFounder('')
                      }}
                    />
                  </div>
                  <div className='mt-2 flex items-center flex-wrap gap-2'>
                    {foundersArray.map((sub, index) => (
                      <div key={index} className='w-full flex gap-2 items-center justify-between rounded p-2 border-[2px] border-gray-250 bg-primary-background'>
                        <p className='first-letter:uppercase font-medium text-content-disabled'>{sub}</p>
                        <LuX
                          onClick={() => {
                            const newTags = foundersArray.filter((_, i) => i !== index).join(',')
                            field.onChange(newTags)
                          }}
                          size={18}
                          className='cursor-pointer text-accent-error hover:text-accent-error-dark transition-colors duration-200 ease-in-out hover:bg-red-600/20 rounded-full'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>

      <div className='px-6'>
        <div className='col-span-5 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Link & Email</h2>
            <p className='text-sm text-content-prompt'>The information that describes a startup {"it's"} link and email.</p>
          </div>

          <Controller name='startupWebsite' control={control} render={({ field }) => <Input {...field} label='Startup Website' required error={errors.startupWebsite?.message} />} />
          <Controller name='startupEmail' control={control} render={({ field }) => <Input {...field} label='Startup Email' required error={errors.startupEmail?.message} />} />
          <Controller name='startupPhone' control={control} render={({ field }) => <Input {...field} label='Startup Phone' required error={errors.startupPhone?.message} />} />
        </div>
      </div>
    </div>
  )
}
