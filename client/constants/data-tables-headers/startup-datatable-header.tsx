'use client'

import { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuEye, LuTrash } from 'react-icons/lu'

export const startupColumns: ColumnDef<StartupType>[] = [
  {
    id: 'startupLogo',
    header: 'Logo',
    size: 64,
    accessorFn: (row) => row.startupLogo,
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={row.original.startupLogo?.includes('https://startup.gov.tn/sites/default/files/2021-10/startuptunisia.png') ? 'https://api.dicebear.com/8.x/shapes/svg' : row.getValue('startupLogo')}
        alt={row.original.startupName}
        className='w-10 h-10 rounded object-fill mr-2'
      />
    ),
  },
  {
    id: 'startupName',
    header: 'Startup Name',
    accessorKey: 'startupName',
    cell: ({ row }) => (
      <div className='flex flex-col items-start'>
        <p className='text-content-display line-clamp-1'>{row.original.startupName}</p>
        <p className='text-xs text-content-prompt'>since {row.original.startupCreatedAt}</p>
      </div>
    ),
  },
  {
    id: 'startupActivitySector',
    header: 'Activity Sector',
    accessorKey: 'startupActivitySector',
  },
  {
    id: 'startupLabelDate',
    header: 'Label Date',
    accessorKey: 'startupLabelDate',
  },

  {
    id: 'startupWebsite',
    header: 'Website',
    accessorKey: 'startupWebsite',
  },
  {
    id: 'startupEmail',
    header: 'Email',
    accessorKey: 'startupEmail',
  },
  {
    id: 'startupPhone',
    header: 'Phone',
    accessorKey: 'startupPhone',
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button className='flex'>
          <LuTrash size={20} className='text-accent-error' />
        </button>
        <button className='flex'>
          <LuClipboardEdit size={20} className='text-accent-link' />
        </button>
        <button className='flex' onClick={() => console.log(row.id)}>
          <LuEye size={20} className='text-accent-success' />
        </button>
        <div className='flex-1' />
      </div>
    ),
  },
]
