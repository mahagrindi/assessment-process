'use client'

import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'

import { Switch } from '@/ui/switch'

export const SourcingCronJob: FC = () => {
  const [isToggle, setToggle] = useState<boolean>(false)

  return (
    <div title={'This feature is not available yet.'} className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-6 opacity-50'>
      <Switch
        checked={isToggle}
        label={'Enable auto sourcing'}
        hint={'This will allow you to set up a cron job to automatically source for startups at a specific time.'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToggle(e.target.checked)}
        disabled
      />
    </div>
  )
}
