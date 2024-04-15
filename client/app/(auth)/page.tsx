'use client'

import Link from 'next/link'
import type { JSX } from 'react'
import { useState } from 'react'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Toast } from '@/ui/toast'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { formLoginSchema } from '@/lib/validation/form-auth-validation'
import { authenticate } from '@/lib/actions/auth-actions'

export default function Page(): JSX.Element {
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorAuthType | undefined>()

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(formLoginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginType): void => {
    setLoading(true)
    authenticate(data).then((res) => {
      if (res.fulfillment) {
        setCookie('token', res.token.token, { path: '/', domain: 'localhost', maxAge: res.token.expiresIn / 1000, expires: new Date(res.token.expiresIn / 1000) })
        if (getCookie('token')) {
          setLoading(false)
          push('/dashboard')
        }
      } else {
        setError(res.error)
        setLoading(false)
      }
    })
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      {error && <Toast title={error?.title} message={error?.description} variant='error' close={() => setError(undefined)} />}
      <div className='w-full max-w-sm flex flex-col gap-8'>
        <div className='grid gap-1'>
          <h1 className='w-full text-center text-3xl text-content-display font-[600] capitalize'>sign in</h1>
          <p className='w-full text-center text-sm text-content-prompt'>Sign in to access the dashboard.</p>
        </div>
        <div className='w-full grid gap-4'>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => <Input {...field} type='email' label={'work email'} autoComplete={'off'} error={errors?.email && errors.email.message} />}
          />

          <div className='w-full flex flex-col gap-1'>
            <Controller
              name={'password'}
              control={control}
              render={({ field }) => <Input {...field} type='password' label={'password'} autoComplete={'off'} error={errors?.password && errors.password.message} />}
            />
            <Link href={'/forget-password'} passHref className='text-sm text-accent-link font-[500] capitalize flex-1 text-end'>
              reset password?
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Button title={'sign in'} type={'submit'} onClick={handleSubmit(onSubmit)} loading={loading} />
        </div>
      </div>
    </div>
  )
}
