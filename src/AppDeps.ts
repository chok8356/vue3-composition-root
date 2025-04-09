import type { UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'
import type { UsersListDeps } from '@/views/UsersList/UsersListDeps'

import { userDetailDeps } from '@/views/UserDetail/UserDetailDeps'
import { usersListDeps } from '@/views/UsersList/UsersListDeps'

export interface AppDeps {
  UserDetail: UserDetailDeps
  UsersList: UsersListDeps
}

export const appDeps: AppDeps = {
  UserDetail: userDetailDeps,
  UsersList: usersListDeps,
}
