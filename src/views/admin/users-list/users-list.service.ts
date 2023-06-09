class UsersLIstService {
  getUsers (from: number, to: number) {
    return supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getUserByEmail (email: string) {
    return supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('email', email)
  }
}

export const usersListService = new UsersLIstService()
