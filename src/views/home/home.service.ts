class HomeService {
  getQuizzes () {
    const authStore = useAuthStore()

    return supabase
      .rpc('get_quizzes_by_user_id', { user_id: authStore.activeUserData?.id }, { count: 'exact' })
      .select('*')
  }

  getQuizById (quizId: number) {
    return supabase
      .rpc('get_quiz_by_id', {
        quiz_id: quizId
      })
      .single()
  }

  getResults (userId: string) {
    return supabase
      .from('answers')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
  }

  getResultById (resultId: number) {
    return supabase
      .from('answers')
      .select('*')
      .eq('id', resultId)
      .single()
  }

  saveResults (payload: IPayload) {
    return supabase
      .from('answers')
      .insert([payload])
  }
}

export const homeService = new HomeService()
