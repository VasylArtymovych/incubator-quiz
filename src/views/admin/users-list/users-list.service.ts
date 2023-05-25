class UsersLIstService {
  getUsers (from: number, to: number) {
    return supabase
      .from('users')
      .select('*', { count: 'exact' })
      .range(from, to)
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
