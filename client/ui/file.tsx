'use client'

import { type ChangeEvent, type FC, forwardRef, type InputHTMLAttributes, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'
import { TbFileUpload, TbTrash } from 'react-icons/tb'
import { getCookie } from 'cookies-next'

const inputVariant = cva(
  'flex items-center gap-2 cursor-pointer px-2 border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4',
  {
    variants: {
      variant: {
        default: 'w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500',
        success: 'w-full border-accent-success text-sm focus:border-gray-500 focus:ring-gray-500',
      },
      size: {
        default: 'h-10',
        small: 'h-8',
        large: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>, VariantProps<typeof inputVariant> {
  label: string
  hint?: string
  error?: string
  onChange: (value: string) => void
}

export const FileUpload: FC<ComponentProps> = forwardRef<HTMLInputElement, ComponentProps>(({ label, hint, error, variant = 'default', size = 'default', required = false, onChange }, ref) => {
  const [selectedFile, setSelectFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectFile(file)

      setUploadProgress(1)
      const formData = new FormData()
      formData.append('file', file)

      fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/files`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getCookie('token')}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let progress = 1
          const interval = setInterval(() => {
            progress += 7
            if (progress > 100) {
              progress = 100
              clearInterval(interval)
            }
            setUploadProgress(progress)
          }, 100) // Change the interval as needed
          onChange(data.url)
          return data
        })
        .catch((err) => {
          console.error('Fetch error:', err)
          throw err // Rethrow the error to handle it in the component
        })
    }
  }

  const generateIconBasedOnFileExtension = (mime: string) => {
    if (mime.toLowerCase().includes('image/')) return '/assets/icons/icon-photo.svg'
    if (mime.toLowerCase().includes('pdf')) return '/assets/icons/icon-pdf.svg'
    if (mime.toLowerCase().includes('csv')) return '/assets/icons/icon-csv.svg'
    if (mime.toLowerCase().includes('.document')) return '/assets/icons/icon-doc.svg'
    if (mime.toLowerCase().includes('.sheet')) return '/assets/icons/icon-clx.svg'
    if (mime.toLowerCase().includes('.presentation')) return '/assets/icons/icon-ppt.svg'
    if (mime.toLowerCase().includes('.zip')) return '/assets/icons/icon-folder.svg'
    return '/assets/icons/icon-txt.svg'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className='flex flex-col items-start gap-1 self-stretch'>
      {label && (
        <label className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
          <span>{label}</span>
          {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
        </label>
      )}

      {selectedFile ? (
        <div className='w-full flex-1 flex flex-col my-2'>
          <div className='w-full flex-1 flex items-center gap-3 mb-2'>
            <div className='w-11 h-11 flex items-center justify-center border-[2px] border-primary-border rounded'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={generateIconBasedOnFileExtension(selectedFile.type)} className='w-8 h-8 object-contain' alt='icon image upload' />
            </div>
            <div className='w-full flex flex-1 flex-col items-start'>
              <p className='text-sm font-[500] text-content-display first-letter:uppercase line-clamp-1'>{selectedFile.name}</p>
              <p className='text-sm font-[500] text-content-disabled first-letter:uppercase'>{formatFileSize(selectedFile.size)}</p>
            </div>
            <div>
              <TbTrash
                size={18}
                className='text-content-prompt hover:text-accent-error cursor-pointer'
                onClick={() => {
                  setSelectFile(null)
                  onChange('')
                }}
              />
            </div>
          </div>
          <div className='w-full flex items-center gap-x-3 whitespace-nowrap'>
            <div className='flex-1 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700' role='progressbar'>
              <div
                className={mr(
                  'flex max-w-full flex-col justify-center rounded-full bg-accent-link overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500',
                  uploadProgress === 100 && 'bg-accent-success'
                )}
                style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className='w-[62px] text-end'>
              <span className='text-sm text-gray-800 dark:text-white'>{`${uploadProgress}%`}</span>
            </div>
          </div>
        </div>
      ) : (
        <label htmlFor={label} className='w-full flex-1'>
          <div className={mr(inputVariant({ variant, size }), error && 'border-[2px] border-accent-error focus:border-red-500 focus:ring-red-500')}>
            <TbFileUpload size={18} className='text-content-prompt' />
            <span className='text-sm font-[500] text-content-disabled first-letter:uppercase'>upload file</span>
          </div>
          <input ref={ref} id={label} type='file' className={'sr-only peer'} autoComplete='no' onChange={handleFileChange} />
        </label>
      )}
      {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
      {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
    </div>
  )
})

FileUpload.displayName = 'FileUpload'
