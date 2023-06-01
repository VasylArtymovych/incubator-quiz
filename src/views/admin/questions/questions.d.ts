interface IOption {
  title: string
  is_correct: boolean
}

interface IQuestion {
  id: number
  title: string
  image?: string
  timer: number
  options: IOption[]
  tags: string[]
}

type TUpsetQuestion = Omit<IQuestion, 'id'>

type TPropQues = keyof IQuestion

interface ISortPropOrderQues {
  prop: TPropQues
  order: TOrder
}