interface IRegisterPayload {
  email: string
  password: string
}

interface IUser {
  id: string
  email: string 
  [key: string]: any
}
