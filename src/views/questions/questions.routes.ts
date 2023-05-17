import type { RouteRecordRaw } from 'vue-router'

export const questionsRoutesNames = {
  questions: 'questions'
}

export const questionsRoutes: RouteRecordRaw[] = [
  {
    path: '/questions',
    name: questionsRoutesNames.questions,
    component: () => import('@/views/questions/Questions.vue')
  }
]
