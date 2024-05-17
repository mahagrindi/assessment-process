'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow, LuClipboardEdit, LuEye, LuShield, LuShieldClose } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { PUTVisibilityCriterias, PUTVisibilitySubAxe } from '@/actions/sub-axe-server-actions'

export const CriteriaColumns: ColumnDef<CriteriaType>[] = [
  {
    id: 'criterionName',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>Criterion</p>
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
        <p className='text-sm text-content-display capitalize'>{row.original.criterionName}</p>
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
    id: 'action',
    header: ({ header }) => <div className='text-end mr-5'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2 '>
        <button title='Restrict access' className='flex disabled:opacity-25 disabled:cursor-not-allowed' onClick={() => PUTVisibilityCriterias(row.original.id)}>
          {row.original.visibility ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>

        <Link passHref href={`/dashboard/axes/detail/sub-axe/${row.original.criterionName}?idcriterias=${row.original.id}`}>
          <button title='Edit user' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>

        <div className='flex-1' />
      </div>
    ),
  },
]
