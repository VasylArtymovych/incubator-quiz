export const useUserResultsStore = defineStore('userResultsStore', () => {
  const loading = ref(true)
  const userResults = ref<IResult[]>([])
  const currentResult = ref<IResult | null>(null)

  const getResults = async (userId: string) => {
    try {
      const { data, error } = await userResultsService.getResults(userId)
      if (error) throw new Error(error.message)
      if (data) {
        userResults.value = data as IResult[]
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  const getResultById = async (resultId: number) => {
    try {
      const { data, error } = await userResultsService.getResultById(resultId)
      if (error) throw new Error(error.message)
      if (data) {
        currentResult.value = data as IResult
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    userResults,
    currentResult,
    getResults,
    getResultById
  }
})
