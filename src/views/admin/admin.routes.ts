import type { RouteRecordRaw } from 'vue-router'
import { questionsRoutesNames, questionsRoutes } from './questions/questions.routes'
import { quizzesRoutesNames, quizzesRoutes } from './quizzes/quizzes.routes'
import { usersRoutesNames, usersRoutes } from './users-list/users-list.routes'
import { resultsRoutesNames, resultsRoutes } from './results/results.routes'
import { authRoutesNames } from '@/views/auth/auth.routes'

export const adminRoutesNames = {
  admin: 'admin',
  ...questionsRoutesNames,
  ...quizzesRoutesNames,
  ...usersRoutesNames,
  ...resultsRoutesNames
}

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: adminRoutesNames.admin,
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      ...questionsRoutes,
      ...quizzesRoutes,
      ...usersRoutes,
      ...resultsRoutes
    ],
    meta: { role: 'admin', isProtected: true },
    redirect: { name: adminRoutesNames.quizzes },

    beforeEnter: (to) => {
      const { activeUserData } = useAuthStore()

      if (to.meta.isProtected && activeUserData?.user_metadata.role !== to.meta.role) {
        return { name: authRoutesNames.login }
      }
      return true
    }
  }
]
