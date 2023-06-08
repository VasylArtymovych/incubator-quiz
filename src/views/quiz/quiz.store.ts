export const useQuizStore = defineStore('quizStore', () => {
  const currentQuiz = ref<IQuizPopulated| null>(null)
  const loading = ref(false)

  const currentQuestion = ref<IQuestion | null>(null)
  const answers = ref<IAnswer[]>([])

  const setCurrentQuestion = (step = 1) => {
    if (currentQuiz.value) {
      currentQuestion.value = currentQuiz.value?.questions[step - 1]
    }
  }

  const addAnswer = (answer: IAnswer) => {
    answers.value.push(answer)
  }

  const getQuizById = async (id: number) => {
    if (currentQuiz.value) return
    try {
      loading.value = true
      const { data, error } = await quizService.getQuizById(id)
      if (error) throw new Error(error.message)
      if (data) {
        currentQuiz.value = data as IQuizPopulated
        setCurrentQuestion()
      }
    } catch (error: any) {
      return useErrorNotification(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    currentQuiz,
    loading,
    currentQuestion,
    answers,
    setCurrentQuestion,
    addAnswer,
    getQuizById
  }
})
