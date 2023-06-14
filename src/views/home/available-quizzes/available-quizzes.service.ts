class AvailableQuizzesService {
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
}

export const availableQuizzesService = new AvailableQuizzesService()
