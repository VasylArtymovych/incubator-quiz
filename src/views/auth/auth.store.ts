import { router, routeNames } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const activeUserData = ref<IUser | null>(JSON.parse(localStorage.getItem('iq-user')!))

  const setUserData = (user: IUser) => {
    activeUserData.value = user
    localStorage.setItem('iq-user', JSON.stringify(user))
  }

  const logOut = () => {
    return authService.logOut()
      .then(() => {
        window.location.href = router.resolve(routeNames.login).href
      })
  }

  return {
    activeUserData,
    setUserData,
    logOut
  }
})
