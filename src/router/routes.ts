import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import { adminRoutes } from '@/views/admin/admin.routes'

import HomePage from '@/views/user/Home.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.rootPage,
    component: HomePage,
    children: [
      {
        path: 'userQuizzes',
        name: routeNames.userQuizzes,
        component: () => import('@/views/user/user-quizzes/UserQuizzes.vue'),
        meta: { isProtected: true }
      },
      {
        path: '/userQuizzes/quiz/:id',
        name: routeNames.passQuiz,
        component: () => import('@/views/user/user-quizzes/components/Quiz.vue'),
        meta: { isProtected: true }
      },
      {
        path: 'results',
        name: routeNames.userResults,
        component: () => import('@/views/user/user-results/UserResults.vue'),
        meta: { isProtected: true }
      },
      {
        path: 'results/resultInfo/:resultId',
        name: routeNames.resultInfo,
        component: () => import('@/components/ResultInfo.vue'),
        meta: { isProtected: true }
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  ...authRoutes,
  ...adminRoutes
]
