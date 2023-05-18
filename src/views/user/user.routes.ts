import type { RouteRecordRaw } from 'vue-router'

export const userRoutesNames = {
  user: 'user'
}

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: userRoutesNames.user,
    component: () => import('@/views/user/User.vue'),
    meta: { role: 'User', isProtected: true }
  }
]
