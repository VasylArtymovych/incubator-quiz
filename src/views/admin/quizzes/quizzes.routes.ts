import type { RouteRecordRaw } from 'vue-router'

export const quizzesRoutesNames = {
  quizzes: 'quizzes',
  quiz: 'quiz'
}

export const quizzesRoutes: RouteRecordRaw[] = [
  {
    path: 'quizzes',
    name: quizzesRoutesNames.quizzes,
    component: () => import('@/views/admin/quizzes/Quizzes.vue')
  },
  {
    path: 'quizzes/:quizId',
    name: quizzesRoutesNames.quiz,
    component: () => import('@/views/admin/quizzes/components/UpsertQuiz.vue')
  }
]
