import { router, routeNames } from '@/router'

export const navigateToAdminOrUserPage = () => {
  const authStore = useAuthStore()

  let name = routeNames.rootPage

  if (authStore.getUserRole === 'admin') name = routeNames.admin

  router.push({ name, replace: true })
}
