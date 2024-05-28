'use client'

import Link from 'next/link'

import type { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuEye, LuTrash } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { mr } from '@/utils/class-authority-merge'
import { DELETE } from '@/actions/cohort-server-actions'

export const cohortColumns: ColumnDef<CohortType>[] = [
  {
    id: 'cohortName',
    header: 'Cohort Name',
    accessorKey: 'cohortName',
    cell: ({ row }) => <p className='text-content-display capitalize'>{row.original.cohortName}</p>,
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
              return <Chip title={row.original.cohortStatus} size='small' variant='default' />
            case 'ONBOARDING':
              return <Chip title={row.original.cohortStatus} size='small' variant='content' />
            case 'ONGOING':
              return <Chip title={row.original.cohortStatus} size='small' variant='info' />
            case 'SUSPENDED':
              return <Chip title={row.original.cohortStatus} size='small' variant='warning' />
            case 'COMPLETED':
              return <Chip title={row.original.cohortStatus} size='small' variant='danger' />
            default:
              return <Chip title={row.original.cohortStatus} size='small' variant='default' />
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
    header: 'Duration',
    accessorFn: (row) => `${row.cohortDuration} weeks`,
  },
  {
    id: 'cohortEndDate',
    header: 'End Date',
    accessorFn: (row) => row.cohortEndDate.slice(0, 10),
  },

  {
    id: 'cohortProgram',
    header: 'Program',
    accessorKey: 'program.programName',
  },
  {
    id: 'cohortChallenges',
    header: 'Challenges',
    accessorFn: (row) => `${row.challenges.length} challenges`,
  },
  {
    id: 'actions',
    header: (row) => <div className='flex justify-end capitalize'>{row.header.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button
          title={row.original.cohortStatus === 'ONBOARDING' ? 'Remove startup from list' : 'Set Cohort status to onboarding to delete'}
          className='flex disabled:cursor-not-allowed'
          onClick={() => DELETE(row.original.id!)}
          disabled={row.original.cohortStatus !== 'ONBOARDING'}>
          <LuTrash size={20} className={mr(row.original.cohortStatus !== 'ONBOARDING' ? 'text-accent-error/50' : 'text-accent-error')} />
        </button>
        <Link passHref href={`/dashboard/programs/cohorts/${row.original.cohortName.replaceAll(' ', '-')}?id=${row.original.id}`}>
          <button title='Edit startup information' className='flex'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <Link passHref href={`/dashboard/programs/cohorts/detail?id=${row.original.id}`}>
          <button title='More information' className='flex'>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
