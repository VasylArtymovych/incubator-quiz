export const useAvailableQuizStore = defineStore('availableQuizzesStore', () => {
  const loading = ref(true)
  const availableQuizzes = ref<IQuizPopulated[]>([])
  const currentQuiz = ref<IQuizPopulated| null>(null)
  const currentQuestion = ref<IQuestion | null>(null)
  const answers = ref<IAnswer[]>([])

  const setCurrentQuiz = (quiz: IQuizPopulated) => {
    currentQuiz.value = quiz
  }

  const setCurrentQuestion = (step = 1) => {
    if (currentQuiz.value) {
      currentQuestion.value = currentQuiz.value?.questions[step - 1]
    }
  }

  const addAnswer = (answer: IAnswer) => {
    answers.value.push(answer)
  }

  const getQuizzes = async () => {
    try {
      const { data, error } = await availableQuizzesService.getQuizzes()
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

  const getQuizById = async (id: number) => {
    if (currentQuiz.value) return
    try {
      const { data, error } = await availableQuizzesService.getQuizById(id)
      if (error) throw new Error(error.message)
      if (data) {
        setCurrentQuiz(data as IQuizPopulated)
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    currentQuiz,
    availableQuizzes,
    currentQuestion,
    answers,
    setCurrentQuiz,
    setCurrentQuestion,
    addAnswer,
    getQuizById,
    getQuizzes
  }
})
