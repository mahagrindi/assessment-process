'use client'
import React, { FC } from 'react'

interface ComponentProps {
  sections: Section[]
  index: number
  variant: 'primary' | 'error' | 'success' | 'default'
}

export const TimeLine: FC<ComponentProps> = ({ index, variant, sections }) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary-yellow'
      case 'error':
        return 'border-red-500'
      case 'success':
        return 'border-green-500'
      case 'default':
        return 'border-gray-300 '
      default:
        return 'border-gray'
    }
  }

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-yellow'
      case 'error':
        return 'bg-red-500'
      case 'success':
        return 'bg-green-500'
      case 'default':
        return 'bg-gray-300 '
      default:
        return 'bg-gray'
    }
  }

  return (
    <ol className={`relative border-s-4 ${getBorderColor()}`}>
      {sections.map((section, indexSection) =>
        section.title === 'Finsh' ? null : (
          <li className='mb-10 ms-4' key={indexSection}>
            {' '}
            {/* Added key prop */}
            <div className={`absolute w-4 h-4 rounded-full -start-2.5 ${getBackgroundColor()}`}></div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{section.title}</h3>
            {indexSection === index && section.questions.length > 0 ? (
              <div>
                <h4 className='mx-3 font-medium'>Questions:</h4>
                <ul className='mx-5'>
                  {' '}
                  {/* Wrap questions in a ul element */}
                  {section.questions.map((question) => (
                    <li className='text-gray-500' key={question.id}>
                      {/* Added key prop */}- {question.questionText}
                    </li>
                  ))}
                </ul>
                {index} et {indexSection}
              </div>
            ) : null}
          </li>
        )
      )}
    </ol>
  )
}
