'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getEvaluationFormsByID } from '@/lib/actions/evaluation-server-action'
import { ContentHeader } from '@/components/content-header'
import { Button } from '@/ui/button'
import Card from '@/ui/card-challenge'
import { TimeLine } from '@/ui/timeline'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { FileUpload } from '@/ui/file'
import { Textarea } from '@/ui/textarea'
import { AddChallenges } from '@/components/Form-builder/add-challenges'
import { AddFormSection } from '@/components/Form-builder/add-form-section'
import RichTextEditor from '@/components/richTextEditor'

export default function Page(): JSX.Element {
  const [sections, setSections] = useState<Section[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [text, setText] = useState('')
  const params = useSearchParams()
  const id = params.get('id')

  const [form, setForm] = useState<FormEvaluationResponseType | null>(null)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDetails = await getEvaluationFormsByID(id!)
        setForm(formDetails)
      } catch (error) {
        console.error('Error fetching forms:', error)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  return (
    <div className='h-full min-h-full w-full flex flex-col  '>
      <ContentHeader title={'Form builder'} args={[<Button title='Edit' />]} />
      <div className='bg-primary-white flex flex-col  p-8  border-t-[2px] border-gray-200'>
        <br />
        <RichTextEditor text={text} setText={setText} />
        <br />
        <AddChallenges challenges={challenges} setChallenges={setChallenges} />
        <br />
        <AddFormSection sections={sections} setSections={setSections} />
      </div>
    </div>
  )
}
