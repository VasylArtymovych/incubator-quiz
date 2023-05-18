import { authRoutesNames } from '@/views/auth/auth.routes'
import { adminRoutesNames } from '@/views/admin/admin.routes'
import { userRoutesNames } from '@/views/user/user.routes'

export const routeNames = {
  rootPage: 'rootPage',
  ...authRoutesNames,
  ...adminRoutesNames,
  ...userRoutesNames
}
