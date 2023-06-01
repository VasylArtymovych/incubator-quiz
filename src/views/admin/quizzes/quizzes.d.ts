interface IQuiz {
  id: number
  title: string
  questions: number[]
  users: string[]
}

interface INewQuiz {
  title: string
  questions: number[]
  users: string[]
}


type TPropQuiz = keyof IQuiz

interface ISortPropOrderQuiz {
  prop: TPropQuiz
  order: TOrder
}