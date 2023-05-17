import { authRoutesNames } from '@/views/auth/auth.routes'
import { questionsRoutesNames } from '@/views/questions/questions.routes'
import { quizzesRoutesNames } from '@/views/quizzes/quizzes.routes'

export const routeNames = {
  rootPage: 'rootPage',
  ...authRoutesNames,
  ...questionsRoutesNames,
  ...quizzesRoutesNames
}
