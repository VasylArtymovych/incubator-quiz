import type { RouteRecordRaw } from 'vue-router'

export const quizRoutesNames = {
  passQuiz: 'passQuiz'
}

export const quizRoutes: RouteRecordRaw[] = [
  {
    path: '/passQuiz',
    name: quizRoutesNames.passQuiz,
    component: () => import('@/views/quiz/Quiz.vue'),
    meta: { isProtected: true }
  }
]