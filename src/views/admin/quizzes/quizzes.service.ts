class QuizzesService {
  getQuizzes (skip: number, limit: number) {
    return supabase
      .rpc('get_quizzes', {}, { count: 'exact' })
      .range(skip, limit)
  }

  getQuizById (id: number) {
    return supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single()
  }

  getQuizByTitle (titleText: string) {
    return supabase
      .from('quizzes')
      .select('*', { count: 'exact' })
      .ilike('title', `%${titleText}%`)
  }

  addQuiz (payload: INewQuiz) {
    return supabase
      .from('quizzes')
      .insert([payload])
  }

  updateQuiz (payload: INewQuiz, quizId: number) {
    return supabase
      .from('quizzes')
      .update(payload)
      .eq('id', quizId)
  }

  deleteQuiz (id: number) {
    return supabase
      .from('quizzes')
      .delete()
      .eq('id', id)
  }
}

export const quizzesService = new QuizzesService()
