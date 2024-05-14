"use client"
import React, { useState } from 'react'
import { MdAddCircleOutline, MdCancel } from 'react-icons/md'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { ContentHeader } from '@/components/content-header'
import { Button } from '@/ui/button'
import { Chip } from '@/ui/chip'
import { POST } from '@/actions/axe-server-actions' // Assuming POST is a valid import
import { cookies } from 'next/headers'

interface SubAxeType {
  id: number
  sub_axe_name: string
  visibility: boolean
}

interface AxeType {
  axe_name: string
  description: string
  visibility: boolean
  subAxes: SubAxeType[]
}

export default function Page(): JSX.Element {
  const [axeState, setAxeState] = useState<AxeType>({
    axe_name: '',
    description: '',
    visibility: false,
    subAxes: [],
  })

  const [nextId, setNextId] = useState<number>(0)

  const addSubAxe = () => {
    const newSubAxe: SubAxeType = { id: nextId + 1, sub_axe_name: '', visibility: false }

    setAxeState((prevState) => ({
      ...prevState,
      subAxes: [...prevState.subAxes, newSubAxe],
    }))
    setNextId((prevId) => prevId + 1) // Update nextId correctly
  }

  const handleNameChange = (id: number, value: string) => {
    const updatedSubAxes = axeState.subAxes.map((subAxe) => (subAxe.id === id ? { ...subAxe, sub_axe_name: value } : subAxe))
    setAxeState((prevState) => ({
      ...prevState,
      subAxes: updatedSubAxes,
    }))
  }

  const handleCancel = (id: number) => {
    const updatedSubAxes = axeState.subAxes.filter((subAxe) => subAxe.id !== id)
    setAxeState((prevState) => ({
      ...prevState,
      subAxes: updatedSubAxes,
    }))
  }

  const handleSubmit = async (data: AxeType) => {
    console.log(data)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies().get('token')?.value || ''}`, // Fixed token retrieval
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`Error submitting form: ${res.status} ${res.statusText}`)
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('An error occurred while submitting the form. Please try again.')
    }
  }

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title='Add Axe' />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(axeState)
        }}>
        <div className='bg-primary-white flex flex-col border-t-2 border-gray-200'>
          <div className='flex flex-row m-5 '>
            <div className='basis-3/4'>
              <div className='grid grid-rows gap-4'>
                <Input
                  type='text'
                  id='axeName'
                  name='axeName'
                  label="Axe's Name"
                  value={axeState.axe_name}
                  onChange={(e) => setAxeState((prevState) => ({ ...prevState, axe_name: e.target.value }))}
                  required
                />
                <Input
                  type='text'
                  id='axeDescription'
                  name='axeDescription'
                  label='Description'
                  value={axeState.description}
                  onChange={(e) => setAxeState((prevState) => ({ ...prevState, description: e.target.value }))}
                  required
                />
                <Switch label='Visibility' checked={axeState.visibility} onChange={(e) => setAxeState((prevState) => ({ ...prevState, visibility: e.target.checked }))} />
                <label>Add Sub-Axe?</label>
                {axeState.subAxes.map((subAxe) => (
                  <div key={subAxe.id}>
                    <div className='flex flex-row'>
                      <div>
                        <MdCancel className='text-red-500 hover:text-red-700 cursor-pointer' size={24} onClick={() => handleCancel(subAxe.id)} />
                        <p className='tooltiptext'>Remove Sub-Axe</p>
                      </div>
                      <p className='text-lg font-medium'>SubAxe {subAxe.id}</p>
                    </div>
                    <div className='w-full grid gap-4 mx-4'>
                      <Input type='text' placeholder='Enter the section name' label="Section's Name" value={subAxe.sub_axe_name} onChange={(e) => handleNameChange(subAxe.id, e.target.value)} />
                    </div>
                  </div>
                ))}
                <div className='text-gray-300 grid justify-items-center border-2 p-2 rounded-md border-gray-200 bg-primary-background'>
                  <MdAddCircleOutline className='hover:text-primary-yellow cursor-pointer' size={32} onClick={addSubAxe} />
                  <p className='text-center italic  '>Add Sub Axe</p>
                </div>
              </div>
              <div className='flex-none w-14 h-14 mt-5'>
                <Button type='submit' title='Submit' />
              </div>
            </div>
            <div className='basis-1/4 pl-5 ml-5 border-l-2'>
              <p className='font-bold  '>Axe Name: </p>
              <p className='m-5'>{axeState.axe_name}</p>
              <p className='font-bold  '>Axe Description: </p>
              <p className='text-justify m-5'>{axeState.description}</p>
              <p className='font-bold mb-5  '>Axe Visibility: </p>
              <Chip variant={axeState.visibility ? 'success' : 'danger'} title={axeState.visibility ? 'Enable' : 'Disable'} />
              <p className='font-bold mt-5'>Axe Sub-Axes</p>
              <ul className='list-disc mt-5 ml-5'>
                {axeState.subAxes.map((subAxe) => (
                  <li key={subAxe.id}>{subAxe.sub_axe_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
