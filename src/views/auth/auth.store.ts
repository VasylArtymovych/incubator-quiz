import { router, routeNames } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const activeUserData = ref<IUser | null>(JSON.parse(localStorage.getItem('iq-user') || 'null'))
  const isAuthenticated = computed(() => !!activeUserData.value)
  const getUserRole = computed(() => activeUserData.value?.user_metadata?.role || 'user')

  const setUserData = (user: IUser) => {
    activeUserData.value = user
    localStorage.setItem('iq-user', JSON.stringify(user))
  }

  const logOut = () => {
    localStorage.removeItem('iq-user')
    return authService.logOut()
      .then(() => {
        window.location.href = router.resolve(routeNames.login).href
      })
  }

  return {
    activeUserData,
    isAuthenticated,
    getUserRole,
    setUserData,
    logOut
  }
})
