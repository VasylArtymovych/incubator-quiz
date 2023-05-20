export const useAuthStore = defineStore('authStore', () => {
  const activeUserData = ref<IUser | null>(JSON.parse(localStorage.getItem('iq-user')!))

  const setUserData = (user: IUser) => {
    activeUserData.value = user
    localStorage.setItem('iq-user', JSON.stringify(user))
  }

  return {
    activeUserData,
    setUserData
  }
})
