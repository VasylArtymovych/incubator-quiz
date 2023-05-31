import { router, routeNames } from '@/router'

export const navigateToAdminOrUserPage = ({ role, email }: IUser) => {
  console.log(role)
  console.log(email)
  if (!email) {
    throw new Error('User role is missing')
  // } else if (role === 'admin') {
  } else if (email === 'admin@softonix.org') {
    return router.push({ name: routeNames.admin, replace: true })
  } else {
    return router.push({ name: routeNames.rootPage, replace: true })
  }
}
