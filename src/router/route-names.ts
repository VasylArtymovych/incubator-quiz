import { authRoutesNames } from '@/views/auth/auth.routes'
import { adminRoutesNames } from '@/views/admin/admin.routes'
import { quizRoutesNames } from '@/views/quiz/quiz.routes'

export const routeNames = {
  rootPage: 'rootPage',
  ...authRoutesNames,
  ...adminRoutesNames,
  ...quizRoutesNames
}
