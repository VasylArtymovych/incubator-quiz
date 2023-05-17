import type { RouteRecordRaw } from 'vue-router'

import { routeNames } from './route-names'
import { authRoutes } from '@/views/auth/auth.routes'
import App from '@/App.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: routeNames.rootPage,
    component: App
  },

  ...authRoutes
]
