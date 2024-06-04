'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getEvaluationFormsByID, POST } from '@/lib/actions/evaluation-server-action'
import { ContentHeader } from '@/components/content-header'
import { Button } from '@/ui/button'
import { AddFormSection } from '@/components/Form-builder/add-form-section'
import MultipleSelect from '@/ui/MultipleSelect'
import { Input } from '@/ui/input'
import { LuFileEdit, LuSave } from 'react-icons/lu'
import RichTextEditorComponent from '@/components/richTextEditor'
import { identify } from '@/lib/actions/current-user-action'
import { GET_ALL } from '@/actions/challenge-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  const { push } = useRouter()

  const [sections, setSections] = useState<Section[]>([])
  const [text, setText] = useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [challenges, setChallenges] = useState<ChallengeType[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [userName, setUserName] = useState<string>('')

  useLayoutEffect(() => {
    fetchChallenges().then((r) => console.log(challenges))
    if (params.slug !== 'create') {
      getEvaluationFormsByID(searchParams.id).then((data) => {
        setTitle(data.title)
        setText(data.description)
        setSelectedOptions(data.challenges)
        setSections(data.sections)
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

  const handleSubmit = async () => {
    console.log("hereee")
    console.log("hereee")
    try {
   /*   const res = await identify()
      const userName = `${res.firstName} ${res.middleName} ${res.lastName}`*/
      const form = {
        title,
        description: text,
        challenges: selectedOptions,
        sections,
        createdBy: "userName",
      }

  
     if (params.slug === 'create') {

       await POST(form)
          .then(() => {
            alert('The form has been added successfully');
            push('/dashboard/evaluations');
          } )
      } else {
     /*   /!* await UPDATE(searchParams.id, form) *!/*/
        alert('The form has been updated successfully')
      }
/*     */
    } catch (error) {

      alert('Error submitting form: ' + error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const renderHeaderButton = () => {
    if (params.slug === 'create') {
      return <Button key='create-axe-element' variant='primary' title='Save' size='large' icon={<LuSave size={20} />} className='gap-2 px-3' onClick={handleSubmit} />
    }
    return <Button key='update-form-element' variant='secondary' title='Update' size='large' icon={<LuFileEdit size={20} />} className='gap-2 px-3' onClick={handleSubmit} />
  }

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader title='Form builder' args={[renderHeaderButton()]} />
      <div className='bg-primary-white flex flex-col p-8 border-t-[2px] border-gray-200'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Title</h2>
        <p className='text-sm text-content-prompt mb-1'>Add Title to the form.</p>
        <br />
        <Input title='Form Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        <h2 className='text-xl font-bold text-content-display capitalize'>Introduction</h2>
        <p className='text-sm text-content-prompt mb-1'>Write the introduction of the form.</p>
        <RichTextEditorComponent text={text} setText={setText} />
        <br />

        <h2 className='text-xl font-bold text-content-display capitalize'>Challenges</h2>
        {challenges && <MultipleSelect options={challenges} selectedValues={selectedOptions} onChange={setSelectedOptions} />}
        <br />

        <h2 className='text-xl font-bold text-content-display capitalize'>Sections</h2>

        <AddFormSection sections={sections} setSections={setSections} />
      </div>
    </div>
  )
}
