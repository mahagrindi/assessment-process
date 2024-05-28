'use client'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getEvaluationFormsByID } from '@/lib/actions/evaluation-server-action'
import { ContentHeader } from '@/components/content-header'
import { Button } from '@/ui/button'
import { AddChallenges } from '@/components/Form-builder/add-challenges'
import { AddFormSection } from '@/components/Form-builder/add-form-section'
import MultipleSelect from '@/ui/MultipleSelect'
import RichTextEditor from '@/components/richTextEditor'
import { GET_ALL } from '@/actions/challenges-server-actions'
import { yupResolver } from '@hookform/resolvers/yup'
import { formulairSchema } from '@/validation/formulair-validation'
import { Controller, useForm } from 'react-hook-form'
import { FIND, POST, PUT } from '@/actions/axe-server-actions'
import { Input } from '@/ui/input'
import { LuFileEdit, LuSave } from 'react-icons/lu'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(formulairSchema),
  })

  useLayoutEffect(() => {
    fetchChallenges()
    if (params.slug !== 'create') {
      getEvaluationFormsByID(searchParams.id).then((data) => {
        reset({ ...(({ createdAt, ...returnedData }) => returnedData)(data) })
      })
    }
  }, [params.slug, searchParams.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchChallenges = async () => {
    try {
      const challengesData = await GET_ALL()
      setChallenges(challengesData)
    } catch (error) {
      console.error('Error fetching challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  const [sections, setSections] = useState<Section[]>([])
  const [text, setText] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [form, setForm] = useState<FormEvaluationResponseType | null>(null)
  const [challenges, setChallenges] = useState<ChallengesTypelist | null>(null)
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader
        title={'Form builder'}
        args={[
          params.slug === 'create' ? (
            <Button
              key={'create-axe-element'}
              variant={'primary'}
              title={'Save'}
              size={'large'}
              icon={<LuSave size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) => POST(data).then(() => push('/dashboard/axes')),
                (error) => console.log(error)
              )}
            />
          ) : (
            <Button
              key={'update-form-element'}
              variant={'secondary'}
              title={'Update'}
              size={'large'}
              icon={<LuFileEdit size={20} />}
              className={'gap-2 px-3'}
              onClick={handleSubmit(
                (data) =>
                  PUT(data).then(() => {
                    alert('Your changes have been successfully saved')
                    push('/dashboard/axes')
                  }),
                (error) => console.log(error)
              )}
            />
          ),
        ]}
      />

      <div className='bg-primary-white flex flex-col p-8 border-t-[2px] border-gray-200'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Introduction</h2>
        <p className='text-sm text-content-prompt mb-1'>Write the introduction of the Form.</p>
        <br />
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => <RichTextEditor {...field} text={text} setText={setText} error={errors?.description && errors.description.message} />}
        />

        <br />
        <h2 className='text-xl font-bold text-content-display capitalize'>Challenges</h2>
        {challenges && (
          <Controller name={'challenges'} control={control} render={({ field }) => <MultipleSelect options={challenges} selectedValues={selectedOptions} onChange={setSelectedOptions} />} />
        )}
        <h2 className='text-xl font-bold text-content-display capitalize'>Sections</h2>
        <br />
        <Controller name={'sections'} control={control} render={({ field }) => <AddFormSection sections={sections} setSections={setSections} />} />
      </div>
    </div>
  )
}
