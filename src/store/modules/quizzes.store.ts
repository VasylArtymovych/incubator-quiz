export const useHomeStore = defineStore('homeStore', () => {
  const loading = ref(false)
  const availableQuizzes = ref<IQuizPopulated[] | null>(null)
  const results = ref<IResult[] | null>(null)

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

  const getResults = async (userId: string) => {
    try {
      loading.value = true
      const { data, error } = await homeService.getResults(userId)
      if (error) throw new Error(error.message)
      if (data) {
        results.value = data as IResult[]
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    availableQuizzes,
    results,
    getQuizzes,
    getResults
  }
})
