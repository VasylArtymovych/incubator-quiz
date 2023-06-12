import type { RouteRecordRaw } from 'vue-router'

export const resultsRoutesNames = {
  results: 'results'
}

export const resultsRoutes: RouteRecordRaw[] = [
  {
    path: 'results',
    name: resultsRoutesNames.results,
    component: () => import('@/views/admin/results/Results.vue')
  }
  // {
  //   path: 'quizzes/:quizId',
  //   name: resultsRoutesNames.upsertQuiz,
  //   component: () => import('@/views/admin/quizzes/components/UpsertQuiz.vue'),
  //   props: (route) => ({ quizId: route.params.quizId === 'new' ? null : Number(route.params.quizId) })
  // }
]
