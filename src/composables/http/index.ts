import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    apikey: import.meta.env.VITE_API_KEY
  }
})

instance.interceptors.request.use(
  async config => {
    const { tokenData, setTokens, logout } = useAuthStore()

    // check and refresh token 5 min before expire time
    if (Number(tokenData.tokenExpiresInTime) < (Date.now() + 5 * 60 * 1000) && tokenData.accessToken &&
    tokenData.refreshToken) {
      try {
        tokenData.accessToken = ''
        const res = await authService.refreshToken(tokenData.refreshToken)
        setTokens(res)

        config.headers = {
          ...config.headers,
          authorization: `Bearer ${res.access_token}`
        }

        return config
      } catch (error) {
        logout()
      }
    }

    if (tokenData.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${tokenData.accessToken}`
      }
    }
    return config
  }
)

instance.interceptors.response.use(
  res => res.data,

  async error => {
    const { logout } = useAuthStore()
    // if (error.response.status === 401 && error.response.data.message === 'JWT expired' && refreshToken) {
    //   try {
    //     const res = await authService.refreshToken(refreshToken)

    //     setTokens(res.access_token, res.refresh_token)

    //     error.config.headers = {
    //       ...error.config.headers,
    //       authorization: `Bearer ${res.access_token}`
    //     }

    //     return instance(error.config)
    //   } catch (error) {
    //     logout()
    //   }
    // }

    if (error.response.status === 401) {
      logout()
    }

    return Promise.reject(error)
  }
)

export const useHttp = instance
