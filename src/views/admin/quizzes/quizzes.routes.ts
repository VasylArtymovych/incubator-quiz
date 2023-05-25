import type { RouteRecordRaw } from 'vue-router'

export const quizzesRoutesNames = {
  quizzes: 'quizzes'
}

export const quizzesRoutes: RouteRecordRaw[] = [
  {
    path: 'quizzes',
    name: quizzesRoutesNames.quizzes,
    component: () => import('@/views/admin/quizzes/Quizzes.vue')
  }
]
