export const useQuizzesStore = defineStore('adminStore', () => {
  const availableQuizzes = ref<IQuizPopulated[] | null>(null)
  const loading = ref(false)

  const getQuizzes = async () => {
    if (availableQuizzes.value) return
    try {
      loading.value = true
      const { data, error } = await homeService.getQuizzes()
      if (error) throw new Error(error.message)
      if (data) {
        availableQuizzes.value = data as IQuizPopulated[]
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    availableQuizzes,
    loading,
    getQuizzes
  }
})
