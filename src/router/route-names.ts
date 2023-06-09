import { authRoutesNames } from '@/views/auth/auth.routes'
import { adminRoutesNames } from '@/views/admin/admin.routes'
import { quizRoutesNames } from '@/views/quiz/quiz.routes'
import { resultRoutesNames } from '@/views/result/result.routes'

export const routeNames = {
  rootPage: 'rootPage',
  availableQuizzes: 'availableQuizzes',
  results: 'results',
  ...authRoutesNames,
  ...adminRoutesNames,
  ...quizRoutesNames,
  ...resultRoutesNames
}
