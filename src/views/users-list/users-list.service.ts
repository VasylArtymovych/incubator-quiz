class UsersLIstService {
  getUsers () {
    return supabase.from('users').select('*')
  }

  addUser (payload: TAddUserPayload) {
    return supabase.from('users').insert([payload])
  }

  deleteUser (id: string) {
    return supabase.from('users').delete().eq('id', id)
  }
}

export const usersListService = new UsersLIstService()
