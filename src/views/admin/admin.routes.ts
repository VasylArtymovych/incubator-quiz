import type { RouteRecordRaw } from 'vue-router'
import { questionsRoutesNames, questionsRoutes } from './questions/questions.routes'
import { quizzesRoutesNames, quizzesRoutes } from './quizzes/quizzes.routes'
import { usersRoutesNames, usersRoutes } from './users-list/users-list.routes'
import { authRoutesNames } from '@/views/auth/auth.routes'

export const adminRoutesNames = {
  admin: 'admin',
  ...questionsRoutesNames,
  ...quizzesRoutesNames,
  ...usersRoutesNames
}

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: adminRoutesNames.admin,
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      ...questionsRoutes,
      ...quizzesRoutes,
      ...usersRoutes
    ],
    meta: { role: 'admin@softonix.org', isProtected: true },
    beforeEnter: (to) => {
      const { activeUserData } = useAuthStore()

      // if (to.meta.isProtected && activeUserData?.role !== to.meta.role) {
      if (to.meta.isProtected && activeUserData?.email !== to.meta.role) {
        return { name: authRoutesNames.login }
      }
      return true
    }
  }
]
