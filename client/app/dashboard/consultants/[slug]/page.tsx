'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { FileUpload } from '@/ui/file'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { ContentHeader } from '@/components/content-header'
import { formConsultantSchema } from '@/validation/form-consultant-validation'
import { FIND, POST, PUT } from '@/actions/consultant-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formConsultantSchema),
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND(searchParams.id).then((data) => {
        reset({ ...(({ authorities, createdAt, ...returnedData }) => returnedData)(data) })
      })
    }
  }, [searchParams.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
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
                (data) => POST(data).then(() => push('/dashboard/consultants')),
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
                (data) => PUT({ ...data }).then(() => push('/dashboard/consultants')),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='flex flex-col gap-4 p-6'>
        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-4'>
          <div className='col-span-3'>
            <Controller name={'username'} control={control} render={({ field }) => <Input {...field} type='email' label='work email' required error={errors?.username && errors.username.message} />} />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <Controller name='firstName' control={control} render={({ field }) => <Input {...field} type='text' label='first name' required error={errors?.firstName && errors.firstName.message} />} />
            <Controller name='middleName' control={control} render={({ field }) => <Input {...field} value={field.value ? field.value : undefined} label='middle name' />} />
            <Controller name='lastName' control={control} render={({ field }) => <Input {...field} type='text' label='last name' required error={errors?.lastName && errors.lastName.message} />} />
          </div>
          <div className='col-span-1'>
            <Controller
              name='profileImage'
              control={control}
              render={({ field }) => (
                <FileUpload
                  label='upload profile image'
                  value={field.value ? field.value : undefined}
                  onChange={(e) => field.onChange(e)}
                  error={errors?.profileImage && errors.profileImage.message}
                />
              )}
            />
          </div>
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex items-center gap-4'>
          <Controller name='cin' control={control} render={({ field }) => <Input {...field} label='cin' required error={errors?.cin && errors.cin.message} />} />
          <Controller name='badgeNumber' control={control} render={({ field }) => <Input {...field} label='badge number' required error={errors?.badgeNumber && errors.badgeNumber.message} />} />
          <Controller name='jobTitle' control={control} render={({ field }) => <Input {...field} label='job title' required error={errors?.jobTitle && errors.jobTitle.message} />} />
          <Controller name='department' control={control} render={({ field }) => <Input {...field} label='department' required error={errors?.department && errors.department.message} />} />
          <Controller name='phoneNumber' control={control} render={({ field }) => <Input {...field} label='phone number' required error={errors?.phoneNumber && errors.phoneNumber.message} />} />
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex items-start gap-4'>
          <div className='flex-1'>
            <Controller name='password' control={control} render={({ field }) => <Input {...field} type='password' label='password' required error={errors?.password && errors.password.message} />} />
          </div>
          <div className='flex-1'>
            <div className='grid gap-4 place-content-end'>
              <Controller
                name='eyEmployee'
                control={control}
                render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={350} label='is EY epmploye' />}
              />
              <Controller
                name='isEligibleForEvaluation'
                control={control}
                render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} width={350} label='user can assest' />}
              />
            </div>
          </div>
        </div>

        <div>
          <Controller name='notes' control={control} render={({ field }) => <Input {...field} value={field.value ? field.value : undefined} label='notes' />} />
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6  flex items-center flex-col gap-4'>
          <Controller
            name='accountNonLocked'
            control={control}
            render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={350} label='account not locked' defaultChecked disabled />}
          />
          <Controller
            name='accountNonExpired'
            control={control}
            render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={350} label='account not expired' defaultChecked disabled />}
          />
          <Controller
            name='credentialsNonExpired'
            control={control}
            render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={350} label='crendentials not expired' defaultChecked disabled />}
          />
          <Controller
            name='enabled'
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                value={field.value ? 1 : 0}
                checked={field.value}
                type='checkbox'
                width={350}
                label='account enabled'
                required
                defaultChecked
                hint={'block an account from accessing the interface.'}
              />
            )}
          />
        </div>
        <Controller name='role' control={control} render={({ field }) => <Input {...field} label='role' required error={errors?.role && errors.role.message} />} />
      </div>
    </div>
  )
}
