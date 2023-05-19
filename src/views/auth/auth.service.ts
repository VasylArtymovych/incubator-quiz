class AuthService {
  register (payload: IRegisterPayload) {
    return supabase.auth.signUp(payload)
  }

  logOut () {
    return supabase.auth.signOut()
  }
}

export const authService = new AuthService()
