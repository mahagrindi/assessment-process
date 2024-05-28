import axios, { type AxiosInstance } from 'axios'

export const query: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_SPRING_PORT}`,
  withCredentials: true,
})
