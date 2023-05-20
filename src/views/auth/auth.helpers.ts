import { router, routeNames } from '@/router'

export const navigateToAdminOrUserPage = (email: string | undefined) => {
  if (!email) {
    throw new Error('email is missing')
  } else if (email === 'admin@softonix.org') {
    return router.push({ name: routeNames.admin, replace: true })
  } else {
    return router.push({ name: routeNames.user, replace: true })
  }
}
