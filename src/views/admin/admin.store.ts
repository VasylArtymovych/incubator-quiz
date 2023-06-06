export const useAdminStore = defineStore('adminStore', () => {
  const questions = ref<IQuestion[] | null>(null)
  const quesLoading = ref(false)
  const totalCount = ref(0)

  async function getQuestions (skip: number, limit: number) {
    try {
      quesLoading.value = true
      const { data, error, count } = await questionsService.getQuestions(skip, limit)
      if (error) throw new Error(error.message)
      if (data) {
        questions.value = data as IQuestion[]
      }
      if (count) {
        totalCount.value = count
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      quesLoading.value = false
    }
  }

  return {
    questions,
    quesLoading,
    getQuestions
  }
})
