'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuTrash } from 'react-icons/lu'

import { Chip } from '@/ui/chip'
import { DELETE } from '@/actions/challenge-server-actions'

export const cohortChallengeColumns: ColumnDef<ChallengeType>[] = [
  {
    id: 'challengeName',
    header: 'Challenge Name',
    accessorKey: 'challengeTitle',
  },
  {
    id: 'challengeRequirement',
    header: 'Requirement',
    accessorKey: 'challengeRequirement',
  },
  {
    id: 'challengeAdvantages',
    header: 'Advantages',
    accessorKey: 'challengeAdvantages',
  },
  // challengeKeywords shows as a chip component show the first one then +3 for the rest
  {
    id: 'challengeKeyword',
    header: 'Keywords',
    accessorKey: 'challengeKeyword',
    cell: ({ row }) => {
      const keywords = row.original.challengeKeyword
      if (keywords && keywords.length > 0) {
        return (
          <div className='flex items-center gap-1'>
            <Chip title={keywords[0]} />
            {keywords.length > 1 && <Chip title={`+${keywords.length - 1}`} variant={'alternative'} />}
          </div>
        )
      }
      return null
    },
  },
  {
    id: 'actions',
    header: (row) => <div className='flex justify-end capitalize'>{row.header.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => {
      const searchParams = useSearchParams() // eslint-disable-line react-hooks/rules-of-hooks

      return (
        <div className='flex flex-row-reverse justify-end gap-2'>
          <button title={'Delete challenge'} className='flex disabled:cursor-not-allowed' onClick={() => DELETE(row.original.id!)}>
            <LuTrash size={20} className='text-accent-error' />
          </button>
          <Link passHref href={`/dashboard/programs/cohorts/challenges/${row.original.challengeTitle.replaceAll(' ', '-')}?id=${row.original.id}&cohort=${searchParams.get('id')}`}>
            <button title='Edit startup information' className='flex'>
              <LuClipboardEdit size={20} className='text-accent-link' />
            </button>
          </Link>
          <div className='flex-1' />
        </div>
      )
    },
  },
]
