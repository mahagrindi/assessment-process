'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow, LuClipboardEdit, LuEye, LuShield, LuShieldClose } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { PUT } from '@/actions/consultant-server-actions'

export const consultantColumns: ColumnDef<ConsultantType>[] = [
  {
    id: 'username',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>name</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=firstName&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=firstName&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <div>
          {row.original.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.original.profileImage} alt={row.original.username} className='flex w-10 h-10 rounded-full' />
          ) : (
            <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
              <p>{row.original.firstName[0]}</p>
              <p>{row.original.lastName[0]}</p>
            </div>
          )}
        </div>
        <div>
          <p className='text-sm text-content-display capitalize'>{`${row.original.firstName} ${row.original.middleName ? row.original.middleName : ''} ${row.original.lastName}`}</p>
          <p className='text-xs text-content-disabled'>{row.original.username}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'badgeNumber',
    header: 'badge',
    accessorKey: 'badgeNumber',
  },
  {
    id: 'jobTitle',
    header: 'Title',
    accessorKey: 'jobTitle',
  },
  {
    id: 'department',
    header: 'department',
    accessorKey: 'department',
  },
  {
    id: 'role',
    header: 'role',
    accessorKey: 'role',
    cell: ({ row }) => (
      <div>
        {row.original.role && row.original.role.split(',').length > 1 ? (
          <div className='flex items-center gap-2'>
            <p>{row.original.role.split(',')[0]}</p>
            <Chip title={`+${row.original.role.split(',').length - 1}`} size={'small'} />
          </div>
        ) : (
          <p>{row.original.role.split(',')[0]}</p>
        )}
      </div>
    ),
  },
  {
    id: 'isEnabled',
    header: 'Status',
    accessorKey: 'isEnabled',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.enabled ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Disabled'} variant={'danger'} />}</div>,
  },
  {
    id: 'phoneNumber',
    header: 'phone',
    accessorKey: 'phoneNumber',
  },
  {
    id: 'isEligibleForEvaluation',
    header: 'can asset',
    accessorKey: 'isEligibleForEvaluation',
    cell: ({ row }) => (row.original.isEligibleForEvaluation ? <Chip title={'TRUE'} variant={'success'} /> : <Chip title={'FALSE'} variant={'danger'} />),
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
    id: 'action',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button
          title='Restrict access'
          disabled={row.original.username === 'wale.sebii@ey.com'}
          onClick={() => PUT({ ...(({ authorities, createdAt, ...c }) => c)(row.original), enabled: !row.original.enabled })}
          className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
          {row.original.enabled ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>
        <Link passHref href={`/dashboard/consultants/${row.original.firstName}-${row.original.lastName}?id=${row.original.id}`}>
          <button title='Edit user' disabled={row.original.username === 'wale.sebii@ey.com'} className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <Link passHref href={`/dashboard/consultants/detail?q=${row.original.id}`}>
          <button title='View details' className='flex'>
            <LuEye size={20} className='text-accent-success' />
          </button>
        </Link>
        <div className='flex-1' />
      </div>
    ),
  },
]
