import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    apikey: import.meta.env.VITE_API_KEY
  }
})

instance.interceptors.request.use(
  async config => {
    return config
  }
)

instance.interceptors.response.use(
  res => res.data,

  async error => {
    return Promise.reject(error)
  }
)

export const useHttp = instance
