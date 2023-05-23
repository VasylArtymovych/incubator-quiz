interface IOption {
  title: string
  is_correct: boolean
}

interface IQuestion {
  title: string
  image?: string
  options: IOption[]
  tags: string[]
}