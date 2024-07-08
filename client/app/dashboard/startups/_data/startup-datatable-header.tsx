'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow, LuClipboardEdit, LuExternalLink, LuEye, LuTrash } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { DELETE } from '@/actions/startup-server-actions'

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
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>startup name</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=startupName&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=startupName&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    accessorKey: 'startupName',
    size: 325,
    cell: ({ row }) => (
      <div className='flex flex-col items-start'>
        <p className='w-full text-content-display line-clamp-1'>{row.original.startupName}</p>
        <p className='text-xs text-content-prompt'>{row.original.startupActivitySector}</p>
      </div>
    ),
  },
  {
    id: 'startupFounders',
    header: 'Founders',
    accessorKey: 'startupFounders',
    cell: ({ row }) => (
      <div>
        {row.original.startupFounders && row.original.startupFounders.split(',').length > 1 ? (
          <div className='flex items-center gap-2'>
            <p>{row.original.startupFounders?.split(',')[0]}</p>
            <Chip title={`+${row.original.startupFounders?.split(',').length - 1}`} size={'small'} />
          </div>
        ) : (
          <p>{row.original.startupFounders?.split(',')[0]}</p>
        )}
      </div>
    ),
  },
  // TODO : Startup label date is being sorted on a string basis, need to convert it to a date object in server
  {
    id: 'startupLabelDate',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>label date</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=startupLabelDate&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=startupLabelDate&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    accessorKey: 'startupLabelDate',
  },
  {
    id: 'startupWebsite',
    header: 'Website',
    accessorFn: (row) => (row.startupWebsite && row.startupWebsite.includes('http') ? row.startupWebsite : `http://${row.startupWebsite}`),
    cell: ({ row }) => (
      <div>
        {row.original.startupWebsite && row.original.startupWebsite !== 'null' ? (
          <a className={'flex items-center gap-2 text-content-display uppercase'} href={row.getValue('startupWebsite')} target='_blank' rel='noreferrer'>
            {row.original.startupWebsite && row.original.startupWebsite.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/)?.[1]}
            <LuExternalLink size={16} className='text-accent-link' />
          </a>
        ) : (
          <Chip title={'N/A'} variant={'warning'} />
        )}
      </div>
    ),
  },
  {
    id: 'startupEmail',
    header: 'Email',
    accessorKey: 'startupEmail',
    cell: ({ row }) => (
      <div>
        {row.original.startupEmail && row.original.startupEmail !== 'null' ? (
          <p className={'flex items-center gap-2 text-content-display uppercase'}>{row.original.startupEmail}</p>
        ) : (
          <Chip title={'N/A'} variant={'ghost'} />
        )}
      </div>
    ),
  },
  {
    id: 'startupPhone',
    header: 'Phone',
    accessorKey: 'startupPhone',
    cell: ({ row }) => (
      <div>
        {row.original.startupPhone && row.original.startupPhone !== 'null' ? (
          <a className={'flex items-center gap-2 text-content-display uppercase'} href={row.getValue('startupWebsite')} target='_blank' rel='noreferrer'>
            {row.original.startupPhone}
          </a>
        ) : (
          <Chip title={'N/A'} variant={'danger'} />
        )}
      </div>
    ),
  },
  {
    id: 'startupCreatedAt',
    header: () => (
      <div className='capitalize flex items-center gap-1'>
        <p>created at</p>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dir') === 'ASC' ? (
          <Link href={{ search: '?sort=startupCreatedAt&dir=DESC' }} passHref>
            <LuArrowUpWideNarrow size={18} />
          </Link>
        ) : (
          <Link href={{ search: '?sort=startupCreatedAt&dir=ASC' }} passHref>
            <LuArrowDownWideNarrow size={18} />
          </Link>
        )}
      </div>
    ),
    accessorKey: 'startupCreatedAt',
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button title='Remove startup from list' className='flex' onClick={() => DELETE(row.original.id!)}>
          <LuTrash size={20} className='text-accent-error' />
        </button>
        <Link passHref href={`/dashboard/startups/${row.original.startupName.replaceAll(' ', '-')}?id=${row.original.id}`}>
          <button title='Edit startup information' className='flex'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <button title='More information' className='flex'>
          <LuEye size={20} className='text-accent-success' />
        </button>
        <div className='flex-1' />
      </div>
    ),
  },
]
