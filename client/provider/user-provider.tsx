'use client'

import { createContext, JSX, ReactNode, useContext, useLayoutEffect, useState } from 'react'

import * as yup from 'yup'
import { query } from '@/hooks/useAxios'
import { UserStore, userStore } from '@/provider/store/user-store'
import { formLoginSchema } from '@/validation/form-auth-validation'

import { usePathname, useRouter } from 'next/navigation'

import { deleteCookie, getCookie, setCookie } from 'cookies-next'

interface ComponentProps {
  children: ReactNode
}

export default function UserProvider({ children }: ComponentProps): JSX.Element {
  type User = yup.InferType<typeof formLoginSchema>

  const { push } = useRouter()
  const pathname: string = usePathname()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStore.isAuthenticated)
  const [user, setUser] = useState<AuthUserProfileType>(userStore.user)
  const [error, setError] = useState<ErrorAuthType>(userStore.error)

  const login = async (data: User): Promise<void> => {
    return await query
      .post('/auth/login', data, {})
      .then((res) => {
        if (res.status === 202) {
          setCookie('token', res.data.token.token, { maxAge: res.data.token.expiresIn / 1000 })
          setCookie('refresh', res.data.refresh.token, { maxAge: res.data.refresh.expiresIn / 1000 })
        }
      })
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const logout = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        deleteCookie('token')
        deleteCookie('refresh')
        resolve(true)
      } catch (error) {}
      reject(error)
    })
  }

  const emptyState = () => {
    setError(userStore.error)
  }

  useLayoutEffect(() => {
    const token = getCookie('token')

    if (token) {
      query
        .get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 202) {
            setUser(res.data)
            setIsAuthenticated(true)
            if (!pathname.includes('/dashboard')) {
              push('/dashboard')
            }
          } else {
            deleteCookie('token')
            deleteCookie('refresh')
            setIsAuthenticated(false)
            if (pathname.includes('/dashboard')) {
              push('/login') // Or any other non-dashboard route
            }
          }
        })
        .catch((err) => {
          setError(err)
          deleteCookie('token')
          deleteCookie('refresh')
          setIsAuthenticated(false)
          if (pathname.includes('/dashboard')) {
            push('/login') // Or any other non-dashboard route
          }
        })
    } else {
      setIsAuthenticated(false)
      if (pathname.includes('/dashboard')) {
        push('/login') // Or any other non-dashboard route
      }
    }
  }, [pathname, push])

  return <UserContext.Provider value={{ isAuthenticated, user, error, login, logout, emptyState }}>{children}</UserContext.Provider>
}

const UserContext = createContext<UserStore>(userStore)
export const useAuth = () => useContext(UserContext)
