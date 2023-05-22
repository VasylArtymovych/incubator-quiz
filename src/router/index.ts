import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
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
