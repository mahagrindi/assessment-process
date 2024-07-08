'use client'

import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'

import { LuCheck, LuX } from 'react-icons/lu'
import { getCookie } from 'cookies-next'
import { motion } from 'framer-motion'

import { Switch } from '@/ui/switch'
import { Button } from '@/ui/button'
import { mr } from '@/utils/class-authority-merge'
import { useRouter } from 'next/navigation'

export const SourcingRequestContent: FC = () => {
  const { refresh } = useRouter()

  const [isToggle, setToggle] = useState<boolean>()
  const [state, setState] = useState<{ loading: boolean; error: { error: string; message: string } | null; success: { success: string; message: string } | null; progress: number }>({
    loading: false,
    error: null,
    success: null,
    progress: 0,
  })

  function handleSourcing() {
    setState({ loading: true, error: null, success: null, progress: 0 })
    const startTime = Date.now() // Get the current time when starting the fetch

    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const endTime = Date.now() // Get the current time when data is received
        const elapsedTime = endTime - startTime // Calculate the time elapsed
        let progress = 0

        if (data !== 0) {
          progress = 100
          refresh()
        } else {
          progress = Math.ceil(Math.min((elapsedTime / MAX_TIME) * 100, 100)) // Calculate progress based on elapsed time
        }

        setState({
          loading: false,
          error:
            data !== 0
              ? null
              : {
                  error: "The sourcing job wasn't executed successfully.",
                  message: "The sourcing job wasn't executed successfully. No element has been added to the database.",
                },
          success: data !== 0 ? { success: 'startup list updated', message: `The sourcing job has been executed successfully. ${data} element has been added to the database.` } : null,
          progress,
        })
        if (data === 0) {
          clearInterval(interval) // Stop the interval if data is 0
        }
      })
      .catch((err) => {
        clearInterval(interval) // Stop the interval if an error occurs
        setState({
          loading: false,
          error: {
            error: 'Error occurred during sourcing job.',
            message: 'An error occurred during the sourcing job. Please try again later.',
          },
          success: null,
          progress: 0,
        })
        console.log('error data=> ', err)
      })

    const MAX_TIME = 10000 // Maximum time to wait for data (in milliseconds)
    const interval = setInterval(() => {
      setState((prevState) => {
        if (prevState.progress < 100) {
          return {
            ...prevState,
            progress: Math.min(prevState.progress + 1, 100), // Increment progress by 1 until it reaches 100
          }
        }
        clearInterval(interval) // Stop the interval if progress reaches 100%
        return prevState
      })
    }, 100) // Update interval frequency as needed
  }

  return (
    <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-6'>
      <Switch
        checked={isToggle}
        label={'manually lunch the sourcing script'}
        hint={'This will allow you to manually lunch the startup sourcing script from our databases.'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToggle(e.target.checked)}
      />

      {isToggle && (
        <div className='flex flex-col gap-6 items-start'>
          {/* progress bar */}
          <div className='w-full'>
            <div className='mb-2 flex justify-between items-center'>
              <h3 className='text-sm font-[500] dark:text-white text-content-display'>Progress title</h3>
              <span className='text-sm text-content-display'>{state.progress}%</span>
            </div>
            <div className='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden' role='progressbar'>
              <motion.div
                className={mr(
                  'flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500',
                  state.progress === 100 && state.success && 'bg-green-600',
                  state.error ? 'bg-red-600' : 'bg-blue-600'
                )}
                initial={{ width: '0%' }}
                animate={{ width: `${state.progress}%` }}
                transition={{ type: 'just' }}
              />
            </div>
          </div>
          {/* error alert */}
          {state.error && (
            <div className='w-full bg-red-100/20 border-s-4 border-red-600 p-4 dark:bg-red-800/30' role='alert'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <span className='inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200'>
                    <LuX size={16} className='text-primary-background' />
                  </span>
                </div>
                <div className='ms-3'>
                  <h3 className='text-gray-800 font-semibold dark:text-white capitalize'>Error!</h3>
                  <p className='text-sm text-gray-700 dark:text-neutral-400'>{state.error.error}</p>
                </div>
              </div>
            </div>
          )}
          {/* success alert */}
          {state.success && (
            <div className='w-full bg-green-100/20 border-s-4 border-green-600 p-4 dark:bg-red-800/30' role='alert'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <span className='inline-flex justify-center items-center size-8 rounded-full border-4 border-green-100 bg-green-200'>
                    <LuCheck size={16} className='text-primary-background' />
                  </span>
                </div>
                <div className='ms-3'>
                  <h3 className='text-gray-800 font-semibold dark:text-white capitalize'>{state.success.success}!</h3>
                  <p className='text-sm text-gray-700 dark:text-neutral-400'>{state.success.message}</p>
                </div>
              </div>
            </div>
          )}
          <Button title='execute job' size='small' variant='primary' className='w-[125px] px-2 h-[42px]' onClick={handleSourcing} loading={state.loading} />
        </div>
      )}
    </div>
  )
}
