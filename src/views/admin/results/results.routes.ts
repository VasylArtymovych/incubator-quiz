import type { RouteRecordRaw } from 'vue-router'

export const resultsRoutesNames = {
  results: 'results',
  userResult: 'userResult'
}

export const resultsRoutes: RouteRecordRaw[] = [
  {
    path: 'results',
    name: resultsRoutesNames.results,
    component: () => import('@/views/admin/results/Results.vue')
  },
  {
    path: 'results/resultInfo/:resultId',
    name: resultsRoutesNames.userResult,
    component: () => import('@/components/ResultInfo.vue')
  }
]
