'use client'

import Link from 'next/link'

import type { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuShield, LuShieldClose, LuTrash } from 'react-icons/lu'

import { toast } from 'sonner'
import { Chip } from '@/ui/chip'

import { DELETE, PUT } from '@/actions/subaxe-server-actions'

export const subAxeColumns: ColumnDef<AxeSubType>[] = [
  {
    id: 'axeSubName',
    header: 'Title',
    accessorKey: 'axeSubName',
    cell: ({ row }) => <p className='capitalize'>{row.original.axeSubName}</p>,
  },
  {
    id: 'axeSubWeight',
    header: 'Weight',
    accessorKey: 'axeSubWeight',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.status ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Hidden'} variant={'danger'} />}</div>,
  },
  {
    id: 'criteriaCount',
    header: 'Criteria',
    accessorKey: 'criteriaCount',
  },
  {
    id: 'action',
    header: ({ header }) => <div className='text-end mr-5'>{header.column.id}</div>,
    accessorKey: 'id',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2 '>
        <button title={'Delete challenge'} className='flex disabled:cursor-not-allowed' onClick={() => DELETE(row.original.id!)}>
          <LuTrash size={20} className='text-accent-error' />
        </button>

        <Link passHref href={`/dashboard/axes/detail/sub-axes?axe=${row.original.axe.id!}&id=${row.original.id}`}>
          <button title='Edit axe' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>

        <button
          title='Restrict visibility'
          className='flex disabled:opacity-25 disabled:cursor-not-allowed'
          onClick={() => {
            PUT(row.original.axe.id!, {
              ...row.original,
              status: !row.original.status,
            })
              .then(() => toast.success('Sub Axe is now ' + (row.original.status ? 'hidden' : 'enabled')))
              .catch((err) => toast.error(err.message))
          }}>
          {row.original.status ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>
        <div className='flex-1' />
      </div>
    ),
  },
]
