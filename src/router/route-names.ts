import { authRoutesNames } from '@/views/auth/auth.routes'
import { adminRoutesNames } from '@/views/admin/admin.routes'

export const routeNames = {
  rootPage: 'rootPage',
  availableQuizzes: 'availableQuizzes',
  passQuiz: 'passQuiz',
  results: 'results',
  resultInfo: 'resultInfo',
  ...authRoutesNames,
  ...adminRoutesNames
}
