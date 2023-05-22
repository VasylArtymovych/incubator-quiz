import type { RouteRecordRaw } from 'vue-router'

export const authRoutesNames = {
  login: 'login',
  register: 'register',
  recovery: 'recovery',
  updatePassword: 'updatePassword'
}

const closeRouteForActiveUser = () => {
  const { activeUserData } = useAuthStore()

  if (activeUserData) {
    return false
  }
  return true
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: authRoutesNames.login,
    component: () => import('@/views/auth/Login.vue'),
    beforeEnter: [closeRouteForActiveUser]
  },
  {
    path: '/register',
    name: authRoutesNames.register,
    component: () => import('@/views/auth/Register.vue'),
    beforeEnter: [closeRouteForActiveUser]
  },
  {
    path: '/recovery',
    name: authRoutesNames.recovery,
    component: () => import('@/views/auth/Recovery.vue'),
    beforeEnter: [closeRouteForActiveUser]
  },
  {
    path: '/updatePassword',
    name: authRoutesNames.updatePassword,
    component: () => import('@/views/auth/UpdatePassword.vue'),
    beforeEnter: [closeRouteForActiveUser]
  }
]
