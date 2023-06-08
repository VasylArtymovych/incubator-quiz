class HomeService {
  getQuizzes () {
    const authStore = useAuthStore()

    return supabase
      .rpc('get_quizzes_by_user_id', { user_id: authStore.activeUserData?.id }, { count: 'exact' })
      .select('*')
  }
}

export const homeService = new HomeService()
