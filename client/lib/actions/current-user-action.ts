'use server'

import { cookies } from 'next/headers'
import { useAxios } from '@/hooks/useAxios'

export async function identify(): Promise<AuthUserProfileType> {
  return await useAxios
    .get('/auth/me', {
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    })
    .then((res) => {
      if (res.status === 200) {
        cookies().set('user', JSON.stringify(res.data))
        return res.data
      }
    })
}
