export const useUserQuizzesStore = defineStore('userQuizzesStore', () => {
  const loading = ref(true)
  const userQuizzes = ref<IQuizPopulated[]>([])
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
      const { data, error } = await userQuizzesService.getQuizzes()
      if (error) throw new Error(error.message)
      if (data) {
        userQuizzes.value = data as IQuizPopulated[]
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
      const { data, error } = await userQuizzesService.getQuizById(id)
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
    userQuizzes,
    currentQuestion,
    answers,
    setCurrentQuiz,
    setCurrentQuestion,
    addAnswer,
    getQuizById,
    getQuizzes
  }
})
