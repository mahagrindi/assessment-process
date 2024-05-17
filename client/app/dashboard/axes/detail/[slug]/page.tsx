'use client'

import { type JSX, useLayoutEffect } from 'react'
import { LuFileEdit, LuSave } from 'react-icons/lu'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/navigation'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'

import { ContentHeader } from '@/components/content-header'
import { formProgramDefaultValues, formProgramSchema } from '@/validation/form-program-validation'
import { POST_SUBAXE } from '@/actions/axe-server-actions'
import { FIND_SUBAXE, PUT_SUBAXE } from '@/actions/sub-axe-server-actions'
import { formSubAxeSchema } from '@/validation/form-sub-axe-validation'
import { Switch } from '@/ui/switch'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string; idSubAxe: string } }): JSX.Element {
  const { push } = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formSubAxeSchema),
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND_SUBAXE(searchParams.idSubAxe).then((data) => reset(data))
    }
  }, [searchParams.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Sub-Axe'}
        args={[
          params.slug === 'create' ? (
            <Button
              key={'create-program-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => POST_SUBAXE(data, searchParams.id).then(() => push(`/dashboard/axes/detail?q=${searchParams.id}`)),
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
                (data) =>
                  PUT_SUBAXE(data).then((res) => {
                    alert('Your changes have been successfully saved')
                  }),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='flex flex-col gap-4 p-6'>
        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-4'>
          <div className='flex flex-row m-5 '>
            <div className='basis-full '>
              <h2 className='text-xl font-bold text-content-display capitalize'> {params.slug === 'create' ? 'Add Sub-Axe' : 'update Sub-Axe'} </h2>
              <p className='text-sm text-content-prompt mb-1'>The from to {params.slug === 'create' ? 'Add Sub-Axe' : 'update Sub-Axe'} </p>

              <div className='flex flex-row m-5 '>
                <div className='basis-full '>
                  <div className='grid grid-rows gap-4'>
                    <Controller
                      name={'subaxe_name'}
                      control={control}
                      render={({ field }) => <Input {...field} type='text' label='Sub-Axe Name' required error={errors?.subaxe_name && errors.subaxe_name.message} />}
                    />

                    <Controller
                      name='visibility'
                      control={control}
                      render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} type='checkbox' width={100} label='Axe enabled' required defaultChecked />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
