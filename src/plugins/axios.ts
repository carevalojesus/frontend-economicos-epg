// create instance of axios and interceptors
import axios from 'axios'
const url = (
  import.meta.env.DEV
    ? import.meta.env.VITE_APP_URL_LOCAL
    : import.meta.env.VITE_APP_URL_PRODUCCION
) as string

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userpgtoken') as string

  if (token)
    config.headers.Authorization = `token ${token}`
  return config
},
(error) => {
  // Do something with request error
  return Promise.reject(error)
},
)

export default instance
