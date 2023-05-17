import { routeNames, router } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const tokenData = {
    accessToken: ref(localStorage.getItem('si-token')),
    refreshToken: ref(localStorage.getItem('si-refreshToken')),
    tokenExpiresInTime: ref(localStorage.getItem('si-expiresInTime'))
  }

  function setTokens<T extends {access_token: string; refresh_token: string; expires_in: number}> (res: T) {
    tokenData.accessToken.value = res.access_token
    localStorage.setItem('si-token', res.access_token)

    tokenData.refreshToken.value = res.refresh_token
    localStorage.setItem('si-refreshToken', res.refresh_token)

    tokenData.tokenExpiresInTime.value = String(Date.now() + res.expires_in * 1000)
    localStorage.setItem('si-expiresInTime', tokenData.tokenExpiresInTime.value)
  }

  function login (payload: ILoginRequest) {
    return authService.login(payload)
      .then((res) => {
        setTokens(res)
      })
  }

  function logout () {
    localStorage.removeItem('si-token')
    localStorage.removeItem('si-refreshToken')
    localStorage.removeItem('si-expiresInTime')
    window.location.href = router.resolve(routeNames.login).href
  }

  return {
    tokenData,
    setTokens,
    login,
    logout
  }
})
