import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import { adminRoutes } from '@/views/admin/admin.routes'

import HomePage from '@/views/home/Home.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.rootPage,
    component: HomePage,
    meta: { isProtected: true },
    children: [
      {
        path: 'availableQuizzes',
        name: routeNames.availableQuizzes,
        component: () => import('@/views/home/available-quizzes/AvailableQuizzes.vue')
      },
      {
        path: '/availableQuizzes/quiz/:id',
        name: routeNames.passQuiz,
        component: () => import('@/views/home/available-quizzes/components/Quiz.vue')
      },
      {
        path: 'results',
        name: routeNames.userResults,
        component: () => import('@/views/home/user-results/UserResults.vue')
      },
      {
        path: 'results/resultInfo/:resultId',
        name: routeNames.resultInfo,
        component: () => import('@/components/ResultInfo.vue')
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
