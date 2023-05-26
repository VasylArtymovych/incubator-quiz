class UsersLIstService {
  getUsers (from: number, to: number) {
    return supabase
      .from('users')
      .select('*', { count: 'exact' })
      .eq('role', 'user')
      .range(from, to)
  }

  getUserByEmail (email: string) {
    return supabase
      .from('users')
      .select()
      .eq('email', email)
  }

  addUser (payload: TAddUserPayload) {
    return supabase
      .from('users')
      .insert([payload])
  }

  deleteUser (id: string) {
    return supabase
      .from('users')
      .delete()
      .eq('id', id)
  }
}

export const usersListService = new UsersLIstService()
