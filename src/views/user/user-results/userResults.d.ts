interface IAnswer {
  id: number
  value: string
}

interface IPayload {
  user_id: string
  quiz_id: number
  answers: IAnswer[]
}

interface IResult {
  id: number
  user_id: string
  user_row: IUser
  quiz_id: number
  quiz_row: IQuizRow
  questions: IQuestion[]
  answers: IAnswer[]
  percentage_score?: number
  created_at: string
}