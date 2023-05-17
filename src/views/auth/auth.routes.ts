import type { RouteRecordRaw } from 'vue-router'

export const authRoutesNames = {
  login: 'login',
  register: 'register'
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: authRoutesNames.login,
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: authRoutesNames.register,
    component: () => import('@/views/auth/Register.vue')
  }
]
