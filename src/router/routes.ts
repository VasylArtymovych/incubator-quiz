import type { RouteRecordRaw } from 'vue-router'

import { routeNames } from './route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import { adminRoutes } from '@/views/admin/admin.routes'
import { userRoutes } from '@/views/user/user.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.rootPage,
    component: () => import('@/views/home/Home.vue'),
    meta: { isProtected: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  ...authRoutes,
  ...adminRoutes,
  ...userRoutes

]
