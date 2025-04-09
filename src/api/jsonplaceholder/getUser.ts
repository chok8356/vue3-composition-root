import type { FetchClient } from '@/api/fetchClient'
import type { UserDto } from '@/api/jsonplaceholder/types/UserDto'

export interface GetUserRequest {
  userId: number
}

export type GetUserResponse = GetUserResponse200

export interface GetUserResponse200 {
  body: UserDto
  status: 200
}

export function getUser(fetchClient: FetchClient) {
  return async (request: GetUserRequest): Promise<GetUserResponse> => {
    const { body, status } = await fetchClient<GetUserResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/users/${request.userId}`,
    })

    if (status === 200) {
      return {
        body,
        status: 200,
      }
    }

    throw new Error('Unknown response')
  }
}
