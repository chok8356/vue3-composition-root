import type { GetUserApiClientDelegate } from '@/api/delegate/GetUserApiClientDelegate'
import type { GetUserResponse200 } from '@/api/jsonplaceholder/getUser'
import type { UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'

import { Err, Ok } from '@thames/monads'

import type { IUserDetailInfo } from '../types/IUserDetailInfo'

export const getUserDetailInfoFactory = (
  getUserApiClient: GetUserApiClientDelegate,
): UserDetailDeps['getUserDetailInfo'] => {
  return async (userId: number) => {
    try {
      const { body, status } = await getUserApiClient({ userId })
      if (status === 200 && body) {
        return Ok(mapUserDtoToUserDetail(body))
      }
      return Err('Server error')
    } catch (error) {
      return Err(`${error}`)
    }
  }
}

const mapUserDtoToUserDetail = (user: GetUserResponse200['body']): IUserDetailInfo => {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    phone: user.phone,
  }
}
