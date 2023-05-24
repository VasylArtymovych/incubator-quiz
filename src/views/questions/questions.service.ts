class QuestionsService {
  getQuestions (from: number, to: number) {
    return supabase.from('questions')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  addQuestion (payload: TUpsetQuestion) {
    return supabase
      .from('questions')
      .insert(payload)
      .single()
  }

  updateQuestion (payload: IQuestion) {
    return supabase
      .from('questions')
      .update(payload)
      .eq('id', payload.id)
  }

  deleteQuestion (id: string) {
    return supabase
      .from('questions')
      .delete()
      .eq('id', id)
  }
}

export const questionsService = new QuestionsService()
