export const useAuthStore = defineStore('authStore', () => {
  const activeUserData = ref<IUser | null>()
  console.log(activeUserData)
  const setUserData = (user: IUser) => {
    activeUserData.value = user
  }

  return {
    activeUserData,
    setUserData
  }
})
