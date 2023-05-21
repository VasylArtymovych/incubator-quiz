class UsersLIstService {
  getUsers () {
    return supabase.from('users').select('*')
  }
}

export const usersListService = new UsersLIstService()
