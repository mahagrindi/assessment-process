'use server'

import * as yup from 'yup'
import { useAxios } from '@/hooks/useAxios'
import { formLoginSchema } from '@/lib/validation/form-auth-validation'
import { cookies } from 'next/headers'

type AuthenticatedUser = yup.InferType<typeof formLoginSchema>

export async function authenticate(data: AuthenticatedUser): Promise<{
  fulfillment: boolean
  token: TokenType
  error: ErrorAuthType
}> {
  return await useAxios
    .post('/auth/login', { ...data })
    .then((res) => ({ fulfillment: true, token: res.data, error: emptyError }))
    .catch((err) => ({ fulfillment: false, token: emptyToken, error: err.response.data }))
}

export async function logout(): Promise<void> {
  cookies().delete('user')
  cookies().delete('token')
}

/**
 * empty state
 */

const emptyToken = { token: '', expiresIn: 0 }
const emptyError = {
  type: '',
  title: '',
  status: 0,
  detail: '',
  instance: '',
  description: '',
}
