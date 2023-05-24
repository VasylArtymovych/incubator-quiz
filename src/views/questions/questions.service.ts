class QuestionsService {
  getQuestions () {
    return supabase.from('questions').select('*')
  }

  addQuestion (payload: TUpsetQuestion) {
    return supabase
      .from('questions')
      .insert([payload])
  }
}

export const questionsService = new QuestionsService()
