class QuestionsService {
  getQuestions (from: number, to: number) {
    return supabase.from('questions')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getQuestionsByTags (tagsArr: string[], from: number, to: number) {
    return supabase
      .from('questions')
      .select('*', { count: 'exact' })
      .contains('tags', tagsArr)
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

  deleteQuestion (id: number) {
    return supabase
      .from('questions')
      .delete()
      .eq('id', id)
  }

  getTags () {
    return supabase
      .from('questions')
      .select('tags')
  }
}

export const questionsService = new QuestionsService()
