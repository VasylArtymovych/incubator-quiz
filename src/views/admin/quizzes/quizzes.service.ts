class QuizzesService {
  getQuizzes (skip: number, limit: number) {
    return supabase
      .from('quizzes')
      .select('*', { count: 'exact' })
      .range(skip, limit)
  }

  addQuiz (payload: INewQuiz) {
    return supabase
      .from('quizzes')
      .insert([payload])
  }
}

export const quizzesService = new QuizzesService()
