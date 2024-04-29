'use server'

import { cookies } from 'next/headers'

export async function identify(): Promise<AuthUserProfileType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      cookies().set('user', JSON.stringify(data))
      return data
    })
    .catch(() => {
      cookies().delete('token')
      cookies().delete('user')
    })
}
