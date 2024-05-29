'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuShield, LuShieldClose, LuTrash } from 'react-icons/lu'

import Link from 'next/link'
import { toast } from 'sonner'

import { DELETE, PUT } from '@/actions/criteria-server-actions'
import { Chip } from '@/ui/chip'

export const criteriaColumns: ColumnDef<AxeSubCriteriaType>[] = [
  {
    id: 'axeSubCriteriaName',
    header: 'Criteria',
    accessorKey: 'axeSubCriteriaName',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => <div className='w-[82px]'>{row.original.status ? <Chip title={'Enabled'} variant={'success'} /> : <Chip title={'Hidden'} variant={'danger'} />}</div>,
  },
  {
    id: 'axeSub.axeSubName',
    header: 'Branch',
    accessorKey: 'axeSub.axeSubName',
  },
  {
    id: 'axeSubCriteriaWeight',
    header: 'Weight',
    accessorKey: 'axeSubCriteriaWeight',
  },
  {
    id: 'axeSub.axe.axeName',
    header: 'Axe',
    accessorKey: 'axeSub.axe.axeName',
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

        <Link passHref href={`/dashboard/axes/criteria/${row.original.axeSubCriteriaName.replaceAll(' ', '-')}?sub=${row.original.axeSub.id}&id=${row.original.id}`}>
          <button title='Edit axe' className='flex disabled:opacity-25 disabled:cursor-not-allowed'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>

        <button
          title='Restrict visibility'
          className='flex disabled:opacity-25 disabled:cursor-not-allowed'
          onClick={() => {
            console.log(row.original)
            PUT({
              ...row.original,
              status: !row.original.status,
            })
              .then(() => toast.success('Criteria is now ' + (row.original.status ? 'hidden' : 'enabled')))
              .catch((err) => toast.error(err.message))
          }}>
          {row.original.status ? <LuShieldClose size={20} className={'text-accent-error'} /> : <LuShield size={20} className={'text-purple-200'} />}
        </button>

        <div className='flex-1' />
      </div>
    ),
  },
]
