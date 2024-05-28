'use client'

import Link from 'next/link'

import type { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuExternalLink, LuEye, LuTrash } from 'react-icons/lu'

import { Chip } from '@/ui/chip'

import { DELETE } from '@/actions/program-server-actions'

export const programColumns: ColumnDef<ProgramType>[] = [
  {
    id: 'programName',
    header: 'Program',
    accessorKey: 'programName',
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <div>
          {row.original.programPicture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.original.programPicture} alt={row.original.programName} className='flex w-10 h-10 rounded-full' />
          ) : (
            <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
              <p>{row.original.programName[0]}</p>
            </div>
          )}
        </div>
        <div>
          <p className='text-sm text-content-display capitalize'>{row.original.programName}</p>
          <p className='text-xs text-content-disabled line-clamp-1'>{row.original.programDescription.slice(0, 25)}...</p>
        </div>
      </div>
    ),
  },
  {
    id: 'programIndustry',
    header: 'Industry',
    accessorKey: 'programIndustry',
    cell: ({ row }) => <p className='capitalize'>{row.original.programIndustry}</p>,
  },
  {
    id: 'timings',
    header: 'Starting From',
    accessorFn: (row) => new Date(row.programStartDate).toLocaleDateString(),
  },
  {
    id: 'programEstimatedDuration',
    header: 'Duration',
    accessorFn: (row) => `${row.programEstimatedDuration} Months`,
  },
  {
    id: 'programEndDate',
    header: 'Ending At',
    accessorFn: (row) => new Date(row.programEndDate!).toLocaleDateString() || 'N/A',
  },
  {
    id: 'programStatus',
    header: 'Status',
    accessorKey: 'programStatus',
    cell: ({ row }) => {
      /**
       * @description this might seem barbaric to put a switch statement to return a component instead of just the variant value
       * but this is a good practice to follow as it makes the code more readable and maintainable and not making typescript angry at me
       */
      switch (row.original.programStatus) {
        case 'STARTING':
          return <Chip title={row.original.programStatus} size='small' variant='default' />
        case 'ONBOARDING':
          return <Chip title={row.original.programStatus} size='small' variant='content' />
        case 'ONGOING':
          return <Chip title={row.original.programStatus} size='small' variant='info' />
        case 'SUSPENDED':
          return <Chip title={row.original.programStatus} size='small' variant='warning' />
        case 'COMPLETED':
          return <Chip title={row.original.programStatus} size='small' variant='danger' />
        default:
          return <Chip title={row.original.programStatus} size='small' variant='default' />
      }
    },
  },
  {
    id: 'provider',
    header: 'Provider',
    accessorKey: 'provider.programProviderName',
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <div>
          {row.original.provider.programProviderLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.original.provider.programProviderLogo} alt={row.original.provider.programProviderName} className='flex w-10 h-10 rounded-full' />
          ) : (
            <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
              <p>{row.original.provider.programProviderName[0]}</p>
            </div>
          )}
        </div>
        <div>
          <p className='text-sm text-content-display capitalize'>{row.original.provider.programProviderName}</p>
          <a target={'_blank'} href={row.original.provider.programProviderWebsite} className='flex items-center gap-1'>
            <p className='text-xs text-accent-link capitalize'>link</p>
            <LuExternalLink size={14} className='text-accent-link' />
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'cohorts',
    header: 'Cohorts',
    accessorFn: (row) => `${row.cohorts.length} cohorts`,
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'id',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button title='Remove Program from list' className='flex' onClick={() => DELETE(row.original.id!)}>
          <LuTrash size={20} className='text-accent-error' />
        </button>
        <Link passHref href={`/dashboard/programs/${row.original.programName.replaceAll(' ', '-')}?id=${row.original.id}`}>
          <button title='Edit Program information' className='flex'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <Link passHref href={`/dashboard/programs/detail?id=${row.original.id}`}>
          <button title='More information' className='flex'>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
