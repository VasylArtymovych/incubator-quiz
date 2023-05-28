class QuizzesService {
  getQuizzes (skip: number, limit: number) {
    return supabase
      .from('quizzes')
      .select('*', { count: 'exact' })
      .range(skip, limit)
  }
}

export const quizzesService = new QuizzesService()
