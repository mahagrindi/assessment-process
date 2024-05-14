'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { DELETE_COHORT } from '@/actions/program-server-actions'
import { LuClipboardEdit, LuTrash } from 'react-icons/lu'
import { mr } from '@/utils/class-authority-merge'
import { Chip } from '@/ui/chip'
import Link from 'next/link'

export const programCohortColumns: ColumnDef<CohortType>[] = [
  {
    id: 'cohortName',
    header: 'Cohort Name',
    accessorKey: 'cohortName',
    cell: ({ row }) => (
      <div className='flex flex-col items-start gap-2'>
        <p className='text-sm text-content-display capitalize'>{row.original.cohortName}</p>
        <p className='text-xs text-content-disabled line-clamp-1'>{row.original.cohortDescription.slice(0, 25)}...</p>
      </div>
    ),
  },
  {
    id: 'cohortStatus',
    header: 'Status',
    accessorKey: 'cohortStatus',
    cell: ({ row }) => (
      <div className='flex items-center'>
        {(() => {
          switch (row.original.cohortStatus) {
            case 'STARTING':
              return <Chip title={row.original.cohortStatus} variant='default' />
            case 'BOARDING':
              return <Chip title={row.original.cohortStatus} variant='content' />
            case 'ONGOING':
              return <Chip title={row.original.cohortStatus} variant='info' />
            case 'SUSPENDED':
              return <Chip title={row.original.cohortStatus} variant='warning' />
            case 'COMPLETED':
              return <Chip title={row.original.cohortStatus} variant='danger' />
            default:
              return <Chip title={row.original.cohortStatus} variant='default' />
          }
        })()}
      </div>
    ),
  },
  {
    id: 'cohortStartDate',
    header: 'Start Date',
    accessorFn: (row) => row.cohortStartDate.slice(0, 10),
  },
  {
    id: 'cohortDuration',
    header: 'tDuration',
    accessorFn: (row) => `${row.cohortDuration} weeks`,
  },
  {
    id: 'cohortEndDate',
    header: 'End Date',
    accessorFn: (row) => row.cohortEndDate.slice(0, 10),
  },

  {
    id: 'actions',
    header: (row) => <div className='flex justify-end capitalize'>{row.header.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button title='Remove startup from list' className='flex disabled:cursor-not-allowed' onClick={() => DELETE_COHORT(row.original.id!)} disabled={row.original.cohortStatus !== 'BOARDING'}>
          <LuTrash size={20} className={mr(row.original.cohortStatus !== 'BOARDING' ? 'text-accent-error/50' : 'text-accent-error')} />
        </button>
        <Link passHref href={`/dashboard/programs/cohorts/${row.original.cohortName}?id=${row.original.id}`}>
          <button title='Edit startup information' className='flex'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
