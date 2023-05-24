interface IOption {
  title: string
  is_correct: boolean
}

interface IQuestion {
  id: string
  title: string
  image?: string
  timer: number
  options: IOption[]
  tags: string[]
}

type TUpsetQuestion = Omit<IQuestion, 'id'>