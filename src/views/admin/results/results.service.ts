class ResultsService {
  getAllResults () {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
  }

  getResultsByQuizTitle (quizIdArr: number[]) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('quiz_id', quizIdArr)
  }

  getResultsByUserId (userIdArr: string[]) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('user_id', userIdArr)
  }

  getResultsByQuizTitleUserId (quizIdArr: number[], userIdArr: string[]) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .in('quiz_id', quizIdArr)
      .in('user_id', userIdArr)
  }

  getUsersBySearchQuery (query: string) {
    return supabase
      .from('profiles')
      .select('*')
      .ilike('email', `%${query}%`)
  }

  getQuizzesBySearchQuery (query: string) {
    console.log('getQuizzesBySearchQuery', query)
    return supabase
      .from('quizzes')
      .select('*')
      .ilike('title', `%${query}%`)
  }
}
export const resultsService = new ResultsService()
