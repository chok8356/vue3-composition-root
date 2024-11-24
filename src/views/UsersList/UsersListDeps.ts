import type { IUser } from '@/views/UsersList/types/IUser'
import type { Result } from '@thames/monads'

import { fetchClient } from '@/api/fetchClient'
import { jsonPlaceholderApiClient } from '@/api/jsonplaceholder/jsonPlaceholderApiClient'
import { getUsersFactory } from '@/views/UsersList/deps/getUsersFactory'

export type UsersListDeps = {
  getUsers: () => Promise<Result<IUser[], string>>
}

export const usersListDeps: UsersListDeps = {
  getUsers: getUsersFactory(jsonPlaceholderApiClient(fetchClient).getUsers),
}
