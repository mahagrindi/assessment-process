'use client'

import Link from 'next/link'

import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow, LuClipboardEdit, LuEye, LuShield, LuShieldClose } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { toast } from 'sonner'

import { PUT } from '@/actions/axe-server-actions'

export const axeColumns: ColumnDef<AxeType>[] = [
  {
    id: 'axeName',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>Name</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sort') === 'axeName' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=axeName&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=axeName&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <p className='text-sm text-content-display capitalize'>{row.original.axeName}</p>
      </div>
    ),
  },
  {
    id: 'axeDescription',
    header: 'Description',
    accessorKey: 'axeDescription',
    cell: ({ row }) => <p className='line-clamp-1'>{row.original.axeDescription}</p>,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.status ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Hidden'} variant={'danger'} />}</div>,
  },
  {
    id: 'createdAt',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>CreateAt</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sort') === 'createdAt' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=createdAt&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=createdAt&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    accessorFn: (row) => (row.createdAt ? row.createdAt.slice(0, 10) : ''),
  },
  {
    id: 'axeSubs',
    header: 'Sub Axes',
    accessorKey: 'axeSubs.length',
  },
  {
    id: 'action',
    header: ({ header }) => <div className='text-end mr-5'>{header.column.id}</div>,
    accessorKey: 'id',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2 '>
        <Link passHref href={`/dashboard/axes/${row.original.axeName}?id=${row.original.id}`}>
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
        <Link passHref href={`/dashboard/axes/detail?id=${row.original.id}`}>
          <button title='View details' className='flex disabled:opacity-25 disabled:cursor-not-allowed' disabled={!row.original.status}>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
