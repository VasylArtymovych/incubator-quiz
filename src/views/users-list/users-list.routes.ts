import type { RouteRecordRaw } from 'vue-router'

export const usersRoutesNames = {
  users: 'users'
}

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: usersRoutesNames.users,
    component: () => import('@/views/users-list/UsersList.vue')
  }
]
