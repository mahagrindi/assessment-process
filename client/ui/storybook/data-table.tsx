'use client'

import type { JSX, PropsWithChildren } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { type ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type PaginationState, useReactTable } from '@tanstack/react-table'

import { mr } from '@/utils/class-authority-merge'

interface ComponentProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  paging: PageableType
}

export function DataTable<T>({ data, columns, paging }: PropsWithChildren<ComponentProps<T>>): JSX.Element {
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // search params
  const pagination_page = searchParams?.get('page') ?? '1'
  const pagination_size = searchParams?.get('size') ?? '10'

  // create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(pagination_page),
    pageSize: Number(pagination_size),
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    setPagination({
      pageIndex: Number(pagination_page) - 1,
      pageSize: Number(pagination_size),
    })
  }, [pagination_page, pagination_size])

  // changed the route as well
  useEffect(() => {
    push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        size: pageSize,
      })}`
    )
  }, [pageIndex, pageSize]) // eslint-disable-line

  const cols = useMemo<ColumnDef<T>[]>(() => [...columns], [columns])

  const table = useReactTable({
    columns: cols,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: paging.totalPages ?? -1,
    rowCount: paging.totalElements,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
  })

  // Function to generate page indices
  const generatePageIndices = () => {
    const currentPageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()
    const pageIndices = []

    for (let i = Math.max(0, currentPageIndex - 2); i <= Math.min(pageCount - 1, currentPageIndex + 2); i++) {
      pageIndices.push(i)
    }

    return pageIndices
  }

  return (
    <div className='bg-primary-white border-[2px] border-gray-200'>
      <div className='px-6 py-4'></div>

      <table className='w-full'>
        <thead className='h-[42px] bg-gray-50 border-y borer-gray-250'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='text-start text-sm text-content-disabled font-medium capitalize px-3'
                  style={{ width: header.getSize() !== 150 ? header.getSize() : 'auto' }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-state={row.getIsSelected() && 'selected'} className='h-[64px] border-b border-gray-250 text-start'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='text-start font-normal text-sm capitalize text-content-display px-3'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr aria-colspan={columns.length}>
              <th>No results.</th>
            </tr>
          )}
        </tbody>
      </table>

      <div className='px-6 py-4'>
        <div className='flex items-center justify-between px-2'>
          <div className='flex flex-row-reverse items-center gap-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              showing {paging.number * paging.size + 1} to {Math.min((paging.number + 1) * paging.size, paging.totalElements)} of {paging.totalElements}
            </div>
            <div>
              <select
                value={pageSize}
                onChange={(e) => setPagination({ pageIndex: 0, pageSize: Number(e.target.value) })}
                className='cursor-pointer h-8 text-xs border border-gray-250 rounded text-content-display'>
                {[5, 10, 15, 25].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex items-center space-x-6 lg:space-x-8'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className='cursor-pointer h-8 w-8 flex items-center justify-center bg-primary-white border disabled:bg-content-mute disabled:text-content-disabled rounded border-gray-250 text-content-display'>
                <span className='sr-only'>Go to first page</span>
                <LuChevronFirst />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className='cursor-pointer h-8 w-8 flex items-center justify-center bg-primary-white border disabled:bg-content-mute disabled:text-content-disabled rounded border-gray-250 text-content-display'>
                <span className='sr-only'>Go to previous page</span>
                <LuChevronLeft />
              </button>
              <div className='flex items-center justify-center gap-1'>
                {/* Page indices */}
                {generatePageIndices().map((index) => (
                  <div
                    key={index}
                    onClick={() => table.setPageIndex(index)}
                    className={mr(
                      'cursor-pointer h-8 w-8 flex items-center justify-center border disabled:bg-content-mute disabled:text-content-disabled text-sm rounded',
                      index !== table.getState().pagination.pageIndex ? 'border-gray-250 text-content-display bg-primary-white' : 'text-primary-background bg-content-display'
                    )}>
                    {index + 1}
                  </div>
                ))}
              </div>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className='cursor-pointer h-8 w-8 flex items-center justify-center bg-primary-white border disabled:bg-content-mute disabled:text-content-disabled rounded border-gray-250 text-content-display'>
                <span className='sr-only'>Go to next page</span>
                <LuChevronRight />
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount())}
                className='cursor-pointer h-8 w-8 flex items-center justify-center bg-primary-white border disabled:bg-content-mute disabled:text-content-disabled rounded border-gray-250 text-content-display'>
                <span className='sr-only'>Go to last page</span>
                <LuChevronLast />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
