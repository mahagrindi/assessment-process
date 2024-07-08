'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuSave } from 'react-icons/lu'

import { Input } from '@/ui/input'
import { FileUpload } from '@/ui/file'
import { Button } from '@/ui/button'

import { useAuth } from '@/provider/user-provider'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { formConsultantDefaultValues, formConsultantSchema } from '@/validation/form-consultant-validation'
import { PUT } from '@/actions/consultant-server-actions'

export default function Page(): JSX.Element {
  const { user, isAuthenticated } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(formConsultantSchema),
    defaultValues: { ...formConsultantDefaultValues },
  })

  useLayoutEffect(() => {
    if (isAuthenticated && user) {
      reset({ ...(({ authorities, createdAt, ...returnedData }) => returnedData)(user) })
    }
  }, [user])

  if (!isAuthenticated && !user) {
    return (
      <div className='relative flex items-center justify-center px-3'>
        <div className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75'></div>
        <div className='absolute inline-flex rounded-full h-3 w-3 bg-yellow-600'></div>
      </div>
    )
  }

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <div className='flex items-center justify-between mb-6'>
        <div className='mb-3'>
          <p className='text-2xl capitalize font-semibold'>Details</p>
          <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>Manage your account settings and your preferences.</p>
        </div>
        <div>
          <Button
            variant={'primary'}
            title={'Save'}
            type='submit'
            size={'large'}
            icon={<LuSave size={20} />}
            disabled={!isDirty}
            className={'gap-2 px-3'}
            onClick={handleSubmit(
              (data) => {
                PUT(data).then(() => {
                  window.location.reload()
                })
              },
              (err) => console.log(err)
            )}
          />
        </div>
      </div>

      <div className='col-span-4 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
        <Controller name='firstName' control={control} render={({ field }) => <Input {...field} label='First Name' error={errors.firstName && errors.firstName.message} />} />
        <Controller name='lastName' control={control} render={({ field }) => <Input {...field} label='Last Name' error={errors.lastName && errors.lastName.message} />} />
        <Controller
          name='middleName'
          control={control}
          render={({ field }) => <Input {...field} value={field.value ? field.value : undefined} label='Middle Name' error={errors.middleName && errors.middleName.message} />}
        />

        <Controller name='phoneNumber' control={control} render={({ field }) => <Input {...field} label='Phone Number' error={errors.phoneNumber && errors.phoneNumber.message} />} />
        <Controller
          name='profileImage'
          control={control}
          render={({ field }) => (
            <FileUpload
              {...field}
              value={field.value ? field.value : undefined}
              onChange={(e) => field.onChange(e)}
              error={errors.profileImage && errors.profileImage.message}
              label='Profile Image'
              hint={field.value ? 'Upload a new profile image' : 'No file chosen'}
            />
          )}
        />
      </div>
    </div>
  )
}
