'use client'

import { type ChangeEvent, type JSX, useLayoutEffect, useState } from 'react'
import { LuArrowLeftToLine, LuChevronRight, LuFileEdit, LuSave, LuX } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Linker } from '@/ui/link'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { TextArea } from '@/ui/textarea'
import { Switch } from '@/ui/switch'
import { toast } from 'sonner'
import { DropDown } from '@/ui/dropdown'

import { ContentHeader } from '@/components/content-header'
import { formForumDefaultValues, formForumSchema } from '@/validation/form-forum-validation'
import { GET_COHORTS } from '@/actions/evaluation-server-actions'
import { FIND, POST, PUT } from '@/actions/form-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const [cohort, setCohort] = useState<string>('')
  const [cohortList, setCohortList] = useState<CohortType[]>([])

  const [question, setQuestion] = useState<ForumQuestionType>({} as ForumQuestionType)

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(formForumSchema),
    defaultValues: { ...formForumDefaultValues },
  })

  useLayoutEffect(() => {
    if (params.slug !== 'create') {
      FIND(searchParams.id).then((data) => {
        reset(data)
      })
    }
  }, [params.slug, searchParams.id, reset])

  useLayoutEffect(() => {
    GET_COHORTS().then((data) => {
      setCohortList(data)
    })
  }, [])

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Evaluation Forum'}
        args={[
          <Linker key={'back-to-axes'} href={'/dashboard/evaluations'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
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
                  POST({
                    ...data,
                    programCohortEntity: cohortList.find((el) => el.id === cohort)!,
                  })
                    .then(() => toast.success('Forum created successfully'))
                    .then(() => push('/dashboard/evaluations'))
                    .catch(() => toast.error("Couldn't create forum. Please try again.")),
                (error) => toast.error("Couldn't create forum. Please try again.")
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
                  PUT({ ...data, programCohortEntity: cohortList.find((el) => el.id === cohort)! })
                    .then(() => toast.success('Forum updated successfully'))
                    .then(() => push('/dashboard/evaluations'))
                    .catch(() => toast.error("Couldn't update forum. Please try again.")),
                (error) => toast.error("Couldn't update forum. Please try again.")
              )}
            />
          ),
        ]}
      />

      <div className='grid grid-cols-6 gap-4 p-6'>
        <div className='col-span-4 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Details</h2>
            <p className='text-sm text-content-prompt'>Fill in the form below to create a new forum or update an existing one.</p>
          </div>

          <div className='w-full grid gap-4'>
            <Controller name='formName' control={control} render={({ field }) => <Input {...field} label='Form Title' required error={errors.formName && errors.formName.message} />} />

            <Controller
              name='formDescription'
              control={control}
              render={({ field }) => <TextArea {...field} label='Forum Description' error={errors.formDescription && errors.formDescription.message} />}
            />
          </div>
        </div>
        <div className='col-span-2 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Status</h2>
            <p className='text-sm text-content-prompt'>By default, the form will be unpublished. You can change the status of at any time.</p>
          </div>
          <div className='w-full'>
            <Controller name='status' control={control} render={({ field }) => <Switch {...field} value={field.value ? 1 : 0} checked={field.value} label='Forum Published' />} />
          </div>
        </div>

        <div className='col-span-6 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
          <div>
            <h2 className='text-xl font-bold text-content-display capitalize'>Challenges</h2>
            <p className='text-sm text-content-prompt'>Select a cohort to view the challenges associated with it. You can only select one cohort at a time.</p>
          </div>

          <div className='w-full grid gap-4'>
            <DropDown
              required
              label='select Cohort'
              placeholder={'Select Cohort'}
              data={cohortList.map((el) => ({ label: el.cohortName, value: el.id! }))}
              value={cohort}
              onChange={(e) => {
                setCohort(e)
              }}
            />

            <div className='flex flex-col gap-4'>
              {cohortList
                .find((el) => el.id === cohort)
                ?.challenges.map((el) => (
                  <div key={el.id} className='bg-gray-100/50 border-[2px] border-gray-200 rounded p-2'>
                    <div className='flex items-center space-x-3'>
                      <span className='size-5 flex justify-center items-center rounded-full bg-gray-200 border border-gray-300 text-gray-700'>
                        <LuChevronRight strokeLinejoin='round' strokeWidth={2} strokeLinecap='round' />
                      </span>
                      <h2 className='text-lg font-bold text-content-display capitalize'>{el.challengeTitle}</h2>
                    </div>
                    <p className='text-sm text-content-prompt'>{el.challengeDescription}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Controller
          name='questions'
          control={control}
          render={({ field }) => {
            const questions = field.value || []
            return (
              <div className='col-span-6 bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col items-start gap-4'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <h2 className='text-xl font-bold text-content-display capitalize'>Forum Questions</h2>
                    <p className='text-sm text-content-prompt'>Add questions to the forum. You can add multiple questions and set the order in which they will appear in the forum.</p>
                  </div>
                  <Button
                    title='Add'
                    className='w-fit'
                    onClick={() => {
                      field.onChange([...questions, question])
                      setQuestion({} as ForumQuestionType)
                    }}
                  />
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <div className='w-full flex items-start gap-2'>
                    <div className='flex-1'>
                      <div className='flex items-start gap-4 mb-4'>
                        <div className='flex-1'>
                          <Input
                            label='Question Name'
                            value={question.questionName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, questionName: event.target.value })}
                            error={errors.questions && errors.questions[0]?.questionName?.message}
                            hint="Add the question you'd like to ask the participan"
                          />
                        </div>
                        <DropDown
                          label='Question Type'
                          placeholder='Select Question Type'
                          data={[
                            { label: 'Text', value: 'text' },
                            { label: 'Number', value: 'number' },
                            { label: 'Date', value: 'date' },
                            { label: 'Email', value: 'email' },
                            { label: 'Checkbox', value: 'checkbox' },
                            { label: 'Radio', value: 'radio' },
                            { label: 'Password', value: 'password' },
                          ]}
                          value={question.questionType}
                          onChange={(e) => setQuestion({ ...question, questionType: e })}
                          hint='Specify the input type of the question to be displayed.'
                          error={errors.questions && errors.questions[0]?.questionType?.message}
                        />
                        <Input
                          min={1}
                          max={100}
                          type='number'
                          label='Question Order'
                          value={question.questionOrder}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, questionOrder: event.target.value })}
                          error={errors.questions && errors.questions[0]?.questionOrder?.message}
                          hint='Specify the order in which the question will appear in the forum.'
                        />
                      </div>
                      <Input
                        value={question.questionHint!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, questionHint: event.target.value })}
                        error={errors.questions && errors.questions[0]?.questionHint?.message}
                        hint='Add a hint to the question to help the user understand what is required.'
                      />
                    </div>
                  </div>
                  <div className='mt-2 flex items-center flex-wrap gap-2'>
                    {getValues('questions')?.map((element, index) => (
                      <div key={index} className='w-full flex gap-2 items-center justify-between rounded p-2 border-[2px] border-gray-250 bg-primary-background'>
                        <div>
                          <p className='first-letter:uppercase font-medium text-content-disabled'>{element.questionName}</p>
                          <p className='first-letter:uppercase font-medium text-content-disabled'>{element.questionType}</p>
                        </div>
                        <LuX
                          onClick={() => {
                            const newQuestions = [...questions]
                            newQuestions.splice(index, 1)
                            field.onChange(newQuestions)
                          }}
                          size={18}
                          className='cursor-pointer text-accent-error hover:text-accent-error-dark transition-colors duration-200 ease-in-out hover:bg-red-600/20 rounded-full'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
