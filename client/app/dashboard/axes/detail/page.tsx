'use client'
import { useEffect, useState, type JSX } from 'react'
import { ContentHeader } from '@/components/content-header'
import { LuPlusCircle } from 'react-icons/lu'
import { Linker } from '@/ui/link'
import { useSearchParams } from 'next/navigation'
import { getAxeDetails } from '@/actions/axe-server-actions'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'
import { MdAddCircleOutline,   MdCancel } from 'react-icons/md'
import { Button } from '@/ui/button'
import { Chip } from '@/ui/chip'
 
interface SubAxeType {
  id: number
  sub_axe_name: string
  visibility: boolean
}

interface AxeType {
  axe_name: string
  description: string
  visibility?: boolean
  subAxes: SubAxeType[]
}

export default function Page({ searchParams }: { searchParams: { q: string } }): JSX.Element {
  const params = useSearchParams()
  const id = params.get('q')
  const [axe, setAxe] = useState<AxeType>() // Changed to array type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axeDetails = await getAxeDetails(id!)
      } catch (error) {
        console.error('Error fetching forms:', error)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  function dateConvert(date: string): string {
    const parts = date.split('T')[0].split('-')
    return `${parts[0]}/${parts[1]}/${parts[2]}`
  }
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
    setNextId(nextId + 1)
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
    await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes`, {
      method: 'POST',
      credentials: 'include',

      body: JSON.stringify(data),
    }).catch((err) => {
      throw new Error(err.message)
    })
  }

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title={'Axe detail'} />
      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='bg-primary-white flex flex-col border-t-2 border-gray-200'>
          <div className='flex flex-row m-5 '>
            <div className='basis-1/3'>
              <div className='grid grid-rows gap-4'>
                <Input type='text' id='axeName' name='axeName' label="Axe's Name" required />
                <Input type='text' id='axeDescription' name='axeDescription' label='Description' required />
                <Switch label='Visibility' />
                <label>Add Sub-Axe?</label>
                {axeState.subAxes.map((subAxe) => (
                  <div key={subAxe.id}>
                    <div className='flex flex-row'>
                      <div className=''>
                        <MdCancel className='text-red-500 hover:text-red-700 cursor-pointer' size={24} onClick={() => handleCancel(subAxe.id)} />
                        <p className='tooltiptext'>Remove Sub-Axe</p>
                      </div>
                      <p className=' text-lg font-medium'>SubAxe {subAxe.id}</p>
                    </div>
                    <div className='w-full grid gap-4 mx-4'>
                      <Input type='text' placeholder='Enter the section name' label="Section's Name" value={subAxe.sub_axe_name} onChange={(e) => handleNameChange(subAxe.id, e.target.value)} />
                    </div>
                  </div>
                ))}
                <div className=' text-gray-300 grid justify-items-center  border-2 p-2 rounded-md border-gray-200 bg-primary-background'>
                  <MdAddCircleOutline className=' hover:text-primary-yellow cursor-pointer' size={32} onClick={addSubAxe} />
                  <p className='text-center italic  '>Add Sub Axe</p>
                </div>
              </div>
              <div className='flex-none w-14 h-14 mt-5'>
                <Button type='submit' title='Submit' onClick={() => handleSubmit(axeState)} />
              </div>
            </div>
            <div className='basis-2/3 pl-5 ml-5 border-l-2'>
           

              <div className='bg-primary-white border-[2px] border-gray-200'>
                <table className='w-full'>
                  <thead className='h-[42px] bg-gray-50 border-y borer-gray-250'>
                    <tr>
                      <th className='text-start text-sm text-content-disabled font-medium capitalize px-3'>sub-Axe Name</th>
                      <th className='text-start text-sm text-content-disabled font-medium capitalize px-3'>Created AT</th>
                      <th className='text-start text-sm text-content-disabled font-medium capitalize px-3'>number of Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {axeState.subAxes
                      ? axeState.subAxes.map((subAxe) => (
                          <tr className='h-[64px] border-b border-gray-250 text-start' key={subAxe.id}>
                            <td className='text-start font-normal text-sm text-content-display px-3'> {subAxe.sub_axe_name}</td>
                            <td className='text-start font-normal text-sm text-content-display px-3'> 5/10/2024</td>
                            <td className='text-start font-normal text-sm text-content-display px-3'> 0</td>
                          </tr>
                        ))
                      : ' No result'}
                  </tbody>
                </table>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
