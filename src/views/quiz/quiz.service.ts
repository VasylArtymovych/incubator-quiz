export class QuizService {
  getQuizById (quizId: number) {
    return supabase
      .rpc('get_quiz_by_id', {
        quiz_id: quizId
      })
      .single()
  }
}

export const quizService = new QuizService()
