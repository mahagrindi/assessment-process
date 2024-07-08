'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import { Chip } from '@/ui/chip'
import { toast } from 'sonner'

import { LuClipboardEdit, LuEye, LuShield, LuShieldClose } from 'react-icons/lu'
import { PUT } from '@/actions/form-server-actions'

export const formColumns: ColumnDef<ForumType>[] = [
  {
    id: 'formName',
    header: 'Form Name',
    accessorKey: 'formName',
  },
  {
    id: 'status',
    header: 'Form Published',
    accessorKey: 'status',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.status ? <Chip title={'Published'} variant={'success'} /> : <Chip title={'Draft'} variant={'danger'} />}</div>,
  },
  {
    id: 'programCohortEntity',
    header: 'Program',
    cell: ({ row }) => (
      <div>
        <p className='capitalize'>{row.original.programCohortEntity.program.programName}</p>
        <p className='text-xs text-content-display'>{row.original.programCohortEntity.cohortName}</p>
      </div>
    ),
  },
  {
    id: 'questions',
    header: 'Questions',
    cell: ({ row }) => <p>{row.original.questions.length}</p>,
  },
  {
    id: 'createdAt',
    header: 'Created At',
    accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    id: 'action',
    header: ({ header }) => <div className='text-end mr-5'>{header.column.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2 '>
        <Link passHref href={`/dashboard/evaluations/${row.original.formName.replaceAll(' ', '-')}?id=${row.original.id}`}>
          <button title='Edit axe' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <button
          title='Restrict visibility'
          className='flex disabled:opacity-25 disabled:cursor-not-allowed'
          onClick={() =>
            PUT({
              ...row.original,
              status: !row.original.status,
            })
              .then(() => toast.success('Axe is now ' + (row.original.status ? 'hidden' : 'enabled')))
              .catch(() => toast.error('An error occurred while updating the axe'))
          }>
          {row.original.status ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>
        <Link passHref href={`/preview?id=${row.original.id}`}>
          <button title='Preview' className='flex disabled:opacity-25 disabled:cursor-not-allowed' disabled={!row.original.status}>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
