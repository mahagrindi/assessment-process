'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuSave } from 'react-icons/lu'

import { useAuth } from '@/provider/user-provider'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

import { formConsultantDefaultValues, formConsultantSchema } from '@/validation/form-consultant-validation'
import { PUT } from '@/actions/consultant-server-actions'

export default function Page(): JSX.Element {
  const { user } = useAuth()

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
    if (user) {
      reset({ ...(({ authorities, createdAt, ...returnedData }) => returnedData)(user), password: '' })
    }
  }, [user])

  if (!user) {
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
          <p className='text-2xl capitalize font-semibold'>security</p>
          <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>Manage your security settings, set new passwords, and enable two-factor authentication.</p>
        </div>
        <div>
          <Button
            variant={'error'}
            title={'Change Password'}
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
        <Controller
          name='password'
          control={control}
          render={({ field }) => <Input {...field} label='Change Password' type='password' hint='Update your password.' error={errors.password && errors.password.message} />}
        />
      </div>
    </div>
  )
}
