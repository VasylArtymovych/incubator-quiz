import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import { adminRoutes } from '@/views/admin/admin.routes'
import { quizRoutes } from '@/views/quiz/quiz.routes'
import {resultRoutes} from '@/views/result/result.routes'

import HomePage from '@/views/home/Home.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/quizzes',
    name: routeNames.rootPage,
    component: () => HomePage,
    meta: { isProtected: true }
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/quizzes'
  },

  ...authRoutes,
  ...adminRoutes,
  ...quizRoutes,
  ...resultRoutes
]
