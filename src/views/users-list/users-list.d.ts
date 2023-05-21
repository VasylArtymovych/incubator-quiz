interface IUserData {
  email: string
  full_name?: string
  id: string
  role: 'user' | 'admin'
}