import type { GetUsersApiClientDelegate } from '@/api/delegate/GetUsersApiClientDelegate'
import type { GetUsersResponse200 } from '@/api/jsonplaceholder/getUsers'
import type { UsersListDeps } from '@/views/UsersList/UsersListDeps'

import { Err, Ok } from '@thames/monads'

import type { IUser } from '../types/IUser'

export function getUsersFactory(getUsersApiClient: GetUsersApiClientDelegate): UsersListDeps['getUsers'] {
  return async () => {
    try {
      const { body, status } = await getUsersApiClient()
      if (status === 200 && body) {
        return Ok(body.map(x => mapUserDtoToUserList(x)))
      }
      return Err('Server error')
    }
    catch (error) {
      return Err(`${error}`)
    }
  }
}

function mapUserDtoToUserList(user: GetUsersResponse200['body'][number]): IUser {
  return {
    id: user.id,
    name: user.name,
  }
}
