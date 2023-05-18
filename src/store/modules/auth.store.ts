import { routeNames, router } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const tokenData = {
    accessToken: ref(localStorage.getItem('si-token')),
    refreshToken: ref(localStorage.getItem('si-refreshToken')),
    tokenExpiresInTime: ref(localStorage.getItem('si-expiresInTime'))
  }

  function setTokens() {}

  function login () {}

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
