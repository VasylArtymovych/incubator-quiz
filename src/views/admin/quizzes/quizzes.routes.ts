import type { RouteRecordRaw } from 'vue-router'

export const quizzesRoutesNames = {
  quizzes: 'quizzes',
  upsertQuiz: 'upsertQuiz'
}

export const quizzesRoutes: RouteRecordRaw[] = [
  {
    path: 'quizzes',
    name: quizzesRoutesNames.quizzes,
    component: () => import('@/views/admin/quizzes/Quizzes.vue')
  },
  {
    path: 'quizzes/:quizId',
    name: quizzesRoutesNames.upsertQuiz,
    component: () => import('@/views/admin/quizzes/components/UpsertQuiz.vue'),
    props: (route) => ({ quizId: route.params.quizId === 'new' ? null : Number(route.params.quizId) })
  }
]
