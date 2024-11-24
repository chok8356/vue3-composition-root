import { userDetailDeps, type UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'
import { usersListDeps, type UsersListDeps } from '@/views/UsersList/UsersListDeps'

export type AppDeps = {
  UserDetail: UserDetailDeps
  UsersList: UsersListDeps
}

export const appDeps: AppDeps = {
  UserDetail: userDetailDeps,
  UsersList: usersListDeps,
}
