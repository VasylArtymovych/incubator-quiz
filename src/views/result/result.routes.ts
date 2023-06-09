import type { RouteRecordRaw } from 'vue-router'

export const resultRoutesNames = {
  result: 'result'
}

export const resultRoutes: RouteRecordRaw[] = [
  {
    path: '/quiz/:id/result',
    name: resultRoutesNames.result,
    component: () => import('@/views/result/Result.vue'),
    meta: { isProtected: true }
  }
]
