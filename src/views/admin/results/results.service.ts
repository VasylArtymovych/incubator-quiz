class ResultsService {
  getAllResults (from: number, to: number) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getResultsByQuizTitle (quizIdArr: number[], from: number, to: number) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('quiz_id', quizIdArr)
      .range(from, to)
  }

  getResultsByUserId (userIdArr: string[], from: number, to: number) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('user_id', userIdArr)
      .range(from, to)
  }

  getResultsByQuizTitleUserId (quizIdArr: number[], userIdArr: string[], from: number, to: number) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('quiz_id', quizIdArr)
      .in('user_id', userIdArr)
      .range(from, to)
  }
}

export const resultsService = new ResultsService()
