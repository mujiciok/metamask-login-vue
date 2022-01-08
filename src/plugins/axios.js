import axios from 'axios'
import { API_URL } from '@/constants'

export const HTTP = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer {token}',
  }
})
