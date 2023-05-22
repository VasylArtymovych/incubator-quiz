interface IOption {
  label: string
  correct: boolean
}

interface IQuestion {
  title: string
  image?: string
  options: IOption[]
  tags: string[]
}