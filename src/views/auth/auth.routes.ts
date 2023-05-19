import type { RouteRecordRaw } from 'vue-router'

export const authRoutesNames = {
  login: 'login',
  register: 'register',
  recovery: 'recovery',
  updatePassword: 'updatePassword'
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
  },
  {
    path: '/recovery',
    name: authRoutesNames.recovery,
    component: () => import('@/views/auth/Recovery.vue')
  },
  {
    path: '/updatePassword',
    name: authRoutesNames.updatePassword,
    component: () => import('@/views/auth/UpdatePassword.vue')
  }
]
