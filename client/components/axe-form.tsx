import { useState } from 'react'
import { POST } from '@/actions/axe-server-actions'
import { Button } from '@/ui/button'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default function AxeForm() {
  const [axe, setAxe] = useState({
    id: 'String',
    axe_name: 'String',
    visibility: false,
    note: 0.0,
    numberProrgam: 0.0,
    coefficient: 0.0,
    description: 'dd',
    branches: [],
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setAxe({ ...axe, [name]: value })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await POST(axe)
      console.log('Axe created')
    } catch (error) {
      console.error('Error creating axe:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' name='axe_name' value={axe.axe_name} onChange={handleChange} />
      </label>
      <label>
        Weight:
        <input type='number' name='weight' value={axe.note} onChange={handleChange} />
      </label>
      <Button type='submit'>Submit</Button>
    </form>
  )
}
