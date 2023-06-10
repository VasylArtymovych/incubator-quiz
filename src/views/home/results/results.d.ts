interface IAnswer {
  id: number
  title: string
  value: string
}

interface IPayload {
  user: string
  quiz: number
  answers: IAnswer[]
}

interface IResult {
  id: number
  user: string
  quiz: number
  questions?: IQuestion[]
  answers: IAnswer[]
  score?: number
}