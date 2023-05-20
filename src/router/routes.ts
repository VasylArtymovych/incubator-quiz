import type { RouteRecordRaw } from 'vue-router'

import { routeNames } from './route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import { adminRoutes } from '@/views/admin/admin.routes'
import { userRoutes } from '@/views/user/user.routes'
import App from '@/App.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: routeNames.rootPage,
    component: App
  },

  ...authRoutes,
  ...adminRoutes,
  ...userRoutes

]
