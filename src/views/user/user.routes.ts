import type { RouteRecordRaw } from 'vue-router'
import { authRoutesNames } from '@/views/auth/auth.routes'

export const userRoutesNames = {
  user: 'user'
}

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: userRoutesNames.user,
    component: () => import('@/views/user/User.vue'),
    meta: { role: 'User', isProtected: true },
    beforeEnter (to) {
      const { activeUserData } = useAuthStore()

      if ((to.meta.isProtected && !activeUserData) ||
        (to.meta.isProtected && activeUserData?.email === 'admin@softonix.org')) {
        return { name: authRoutesNames.login }
      }
      return true
    }
  }
]
