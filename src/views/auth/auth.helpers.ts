import { router, routeNames } from '@/router'

export const navigateToAdminOrUserPage = ({ user_metadata: { role } }: IUser) => {
  if (!role) {
    throw new Error('User role is missing')
  } else if (role === 'admin') {
    return router.push({ name: routeNames.admin, replace: true })
  } else {
    return router.push({ name: routeNames.rootPage, replace: true })
  }
}
