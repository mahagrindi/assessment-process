'use client'
import { useState, useEffect } from 'react'

interface MultipleSelectProps {
  options: ChallengesType[]
  selectedValues?: string[]
  onChange: (selected: string[]) => void
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ options, selectedValues = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSelectedValues, setCurrentSelectedValues] = useState<string[]>(selectedValues)

  useEffect(() => {
    setCurrentSelectedValues(selectedValues)
  }, [selectedValues])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value: string) => {
    if (currentSelectedValues.includes(value)) {
      const updatedValues = currentSelectedValues.filter((v) => v !== value)
      setCurrentSelectedValues(updatedValues)
      onChange(updatedValues)
    } else {
      const updatedValues = [...currentSelectedValues, value]
      setCurrentSelectedValues(updatedValues)
      onChange(updatedValues)
    }
  }

  const getTitleById = (id: string) => {
    const option = options.find((option) => option.id === id)
    return option ? option.title : ''
  }

  return (
    <div>
      <p className='text-sm text-content-prompt mb-1'>Select the Challenges for this Form.</p>
      <div className='my-5 border p-2 rounded cursor-pointer' onClick={handleToggle}>
        {currentSelectedValues.length ? currentSelectedValues.map(getTitleById).join(', ') : 'Select challenges'}
      </div>
      {isOpen && options ? (
        <div className='mb-7 w-full border bg-white rounded divide-y shadow-lg'>
          {options.map((option) => (
            <div key={option.id} className='cursor-pointer hover:bg-gray-200 flex items-center' onClick={() => handleSelect(option.id)}>
              <input type='checkbox' checked={currentSelectedValues.includes(option.id)} readOnly className='m-5' />
              <div className='py-3'>
                <p className='font-bold'>{option.title}</p>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default MultipleSelect
