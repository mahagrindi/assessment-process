import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mr(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}
