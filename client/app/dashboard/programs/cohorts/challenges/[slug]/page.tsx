'use client'

import { type ChangeEvent, type JSX, useLayoutEffect, useState } from 'react'
import { LuFileEdit, LuSave, LuX } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Chip } from '@/ui/chip'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { TextArea } from '@/ui/textarea'

import { ContentHeader } from '@/components/content-header'
import { formChallengeDefaultValues, formChallengeSchema } from '@/validation/form-challenge-validation'
import { FIND, POST, PUT } from '@/actions/challenge-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { cohort: string; id: string } }): JSX.Element {
  const { push } = useRouter()
  const [keywordValue, setKeywordValue] = useState<string>('')
  const [subValue, setSubValue] = useState<string>('')
  const [advantageValue, setAdvantageValue] = useState<string>('')

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(formChallengeSchema),
    defaultValues: formChallengeDefaultValues,
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create' && searchParams.id) {
      FIND(searchParams.id).then((data) => {
        reset(data)
      })
    }
  }, [reset, searchParams.id, params.slug])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Cohort Challenge'}
        args={[
          params.slug === 'create' ? (
            <Button
              key={'create-challenge-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => POST(data, searchParams.cohort).then(() => push(`/dashboard/programs/cohorts/detail?id=${searchParams.cohort}`)),
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
                (data) => PUT(searchParams.id, data).then(() => push(`/dashboard/programs/cohorts/detail?id=${searchParams.cohort}`)),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />
      <div className='grid grid-cols-7 p-6 gap-4'>
        <div className='col-span-5 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>The information that describes the challenge.</p>
          </div>

          <Controller name='challengeTitle' control={control} render={({ field }) => <Input {...field} label='Challenge Name' error={errors.challengeTitle?.message} />} />
          <Controller name='challengeDescription' control={control} render={({ field }) => <TextArea {...field} label='Challenge Description' error={errors.challengeDescription?.message} />} />
          <Controller name='challengeRequirement' control={control} render={({ field }) => <TextArea {...field} label='Challenge Requirement' error={errors.challengeRequirement?.message} />} />
        </div>

        <div className='col-span-2 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Keyword</h2>
            <p className='text-sm text-content-prompt'>Keywords are a way to help you identify startups.</p>
          </div>
          <Controller
            name='challengeKeyword'
            control={control}
            render={({ field }) => {
              return (
                <div className='w-full flex flex-col gap-1'>
                  <label className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
                    <span>Challenge Keyword</span>
                    <span className='text-accent-error ml-1 text-sm'>*</span>
                  </label>
                  <div className='w-full flex items-start gap-2'>
                    <div className='flex-1'>
                      <Input
                        value={keywordValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setKeywordValue(event.target.value)}
                        error={errors.challengeKeyword?.message}
                        hint="Add a keyword and press 'Add' to add it to the list."
                      />
                    </div>
                    <Button
                      title='Add'
                      className='w-fit'
                      disabled={!keywordValue}
                      onClick={() => {
                        field.onChange([keywordValue, ...field.value])
                        setKeywordValue('')
                      }}
                    />
                  </div>
                  <div className='mt-2 flex items-center flex-wrap gap-2'>
                    {getValues('challengeKeyword')?.map((tag, index) => (
                      <Chip
                        key={index}
                        title={tag}
                        icon={
                          <LuX
                            onClick={() => {
                              const newTags = [...field.value]
                              newTags.splice(index, 1)
                              field.onChange(newTags)
                            }}
                            size={18}
                            className='cursor-pointer text-accent-error hover:text-accent-error-dark transition-colors duration-200 ease-in-out'
                          />
                        }
                        className='flex-row-reverse'
                      />
                    ))}
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>

      <div className='p-6'>
        <div className='col-span-5 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Sub Challenges</h2>
            <p className='text-sm text-content-prompt'>Some challenges are the result of a series of smaller challenges.</p>
          </div>

          <Controller
            name='challengeSub'
            control={control}
            render={({ field }) => {
              return (
                <div className='w-full flex flex-col gap-1'>
                  <label className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
                    <span>Sub Challenges</span>
                  </label>
                  <div className='w-full flex items-start gap-2'>
                    <div className='flex-1'>
                      <Input
                        value={subValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSubValue(event.target.value)}
                        error={errors.challengeSub?.message}
                        hint="Add a sub challenge and press 'Add' to add it to the list."
                      />
                    </div>
                    <Button
                      title='Add'
                      className='w-fit'
                      disabled={!subValue}
                      onClick={() => {
                        field.onChange([subValue, ...field.value!])
                        setSubValue('')
                      }}
                    />
                  </div>
                  <div className='mt-2 flex items-center flex-wrap gap-2'>
                    {getValues('challengeSub')?.map((sub, index) => (
                      <div key={index} className='w-full flex gap-2 items-center justify-between rounded p-2 border-[2px] border-gray-250 bg-primary-background'>
                        <p className='first-letter:uppercase font-medium text-content-disabled'>{sub}</p>
                        <LuX
                          onClick={() => {
                            const newTags = [...field.value!]
                            newTags.splice(index, 1)
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

      <div className='p-6'>
        <div className='col-span-5 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Challenges Advantages</h2>
            <p className='text-sm text-content-prompt'>Some challenges have unique advantages.</p>
          </div>

          <Controller
            name='challengeAdvantages'
            control={control}
            render={({ field }) => {
              return (
                <div className='w-full flex flex-col gap-1'>
                  <label className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
                    <span>Challenge Advantages</span>
                  </label>
                  <div className='w-full flex items-start gap-2'>
                    <div className='flex-1'>
                      <Input
                        value={advantageValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setAdvantageValue(event.target.value)}
                        error={errors.challengeAdvantages?.message}
                        hint="Add an advantage and press 'Add' to add it to the list."
                      />
                    </div>
                    <Button
                      title='Add'
                      className='w-fit'
                      disabled={!advantageValue}
                      onClick={() => {
                        field.onChange([advantageValue, ...field.value!])
                        setAdvantageValue('')
                      }}
                    />
                  </div>
                  <div className='mt-2 flex items-center flex-wrap gap-2'>
                    {getValues('challengeAdvantages')?.map((advantage, index) => (
                      <div key={index} className='w-full flex gap-2 items-center justify-between rounded p-2 border-[2px] border-gray-250 bg-primary-background'>
                        <p className='first-letter:uppercase font-medium text-content-disabled'>{advantage}</p>
                        <LuX
                          onClick={() => {
                            const newTags = [...field.value!]
                            newTags.splice(index, 1)
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
    </div>
  )
}
