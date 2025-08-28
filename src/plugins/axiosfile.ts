// create instance of axios and interceptors
import axios from 'axios'
const url = (
  import.meta.env.DEV
    ? import.meta.env.VITE_APP_URL_LOCAL
    : import.meta.env.VITE_APP_URL_PRODUCCION
) as string

const fileInstance = axios.create({
  baseURL: url,
  responseType: 'blob', // siempre blob
})

fileInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userpgtoken') as string
  if (token)
    config.headers.Authorization = `token ${token}`
  return config
})

export default fileInstance
