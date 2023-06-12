class ResultsService {
  getAllResults () {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
  }
}

export const resultsService = new ResultsService()
