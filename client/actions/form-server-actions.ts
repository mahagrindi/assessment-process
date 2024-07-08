'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formForumSchema } from '@/validation/form-forum-validation'

type Forum = yup.InferType<typeof formForumSchema> & {
  programCohortEntity: CohortType
}

export async function GET(query: string = '', status: string = '', page: number = 0, size: number = 10, sort: string = 'createdAt', dir: string = 'desc'): Promise<ForumResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&status=${status}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(body: Forum): Promise<ForumType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<ForumType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(body: Forum): Promise<ForumType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: string): Promise<ForumType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
