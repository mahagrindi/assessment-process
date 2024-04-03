import axios, { type AxiosInstance } from 'axios'

export const useAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_SERVER,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
