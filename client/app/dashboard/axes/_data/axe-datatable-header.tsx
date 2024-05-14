'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow, LuClipboardEdit, LuEye, LuShield, LuShieldClose } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { PUT } from '@/actions/consultant-server-actions'

export const AxeColumns: ColumnDef<AxeType>[] = [
  {
    id: 'axe_name',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>name</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=axe_name&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=axe_name&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <p className='text-sm text-content-display capitalize'>{row.original.axe_name}</p>
      </div>
    ),
  },
  {
    id: 'desciption',
    header: () => (
      <div className='capitalize   items-center      '>
        <p>desciption</p>
      </div>
    ),
    accessorKey: 'desciption',
    cell: ({ row }) => (
      <div className='      max-w-[300px]   '>
        <p className=' py-5  text-justify  '>{row.original.description}</p>
      </div>
    ),
  },

  {
    id: 'visibility',
    header: 'visibility',
    accessorKey: 'visibility',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.visibility ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Disabled'} variant={'danger'} />}</div>,
  },

  {
    id: 'createdAt',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>created</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
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
    accessorFn: (row) => new Date(row.createdAt!).toLocaleDateString(),
  },
  {
    id: 'numberProrgam',
    header: 'number of Prorgam',
    accessorKey: 'numberProrgam',
  },

  {
    id: 'subAxes',
    header: 'number of sub-axe',
    accessorKey: 'subAxes',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.subAxes.length}</div>,
  },

  {
    id: 'action',
    header: ({ header }) => <div className='text-end mr-5'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2 '>
        <button title='Restrict access' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
          {row.original.visibility ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>
        <Link passHref href={`/dashboard/axes/${row.original.axe_name}-${row.original.axe_name}?id=${row.original.id}`}>
          <button title='Edit user' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <Link passHref href={`/dashboard/axes/detail?q=${row.original.id }`}>
          <button title='View details' className='flex'>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
