import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import type { TIndexedObject } from '@/types'
import { stringifyParams } from '@/core/helpers'
export * from './route-names'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const { activeUserData, logOut } = useAuthStore()

  if (to.meta.isProtected && !activeUserData) {
    logOut()
    return false
  }

  return true
})

export const replaceRouterQuery = function (obj?: TIndexedObject) {
  const routerQuery = router.currentRoute.value.query
  const query = obj && Object.keys(obj).length ? stringifyParams({ ...routerQuery, ...obj }) : {}

  if (JSON.stringify(routerQuery) !== JSON.stringify(query)) {
    router.replace({ query })
  }
}
