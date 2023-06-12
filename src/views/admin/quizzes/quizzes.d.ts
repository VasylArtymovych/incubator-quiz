interface IQuiz {
  id: number
  title: string
  questions: number[]
  users: string[]
  created_at: string
}

interface IQuizPopulated {
  id: number
  title: string
  questions: IQuestion[]
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

type IQuizRow = Omit<IQuiz, 'questions'>