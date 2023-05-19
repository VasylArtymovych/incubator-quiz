export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref()

  const register = (payload: IRegisterPayload) => {
    return authService.register(payload)
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message)
        }
        currentUser.value = data.user?.email
        return data
      })
  }

  return {
    currentUser,
    register
  }
})
