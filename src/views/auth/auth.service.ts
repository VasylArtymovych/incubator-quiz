class AuthService {
  register (payload: IRegisterPayload) {
    return supabase.auth.signUp(payload)
  }

  login (payload: IRegisterPayload) {
    return supabase.auth.signInWithPassword(payload)
  }

  logOut () {
    return supabase.auth.signOut()
  }

  recovery (email: string) {
    return supabase.auth.resetPasswordForEmail(email)
  }

  updatePassword (newData: {password: string}) {
    return supabase.auth.updateUser(newData)
  }
}

export const authService = new AuthService()