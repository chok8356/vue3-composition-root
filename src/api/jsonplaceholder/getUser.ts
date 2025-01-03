import type { FetchClient } from '@/api/fetchClient'
import type { UserDto } from '@/api/jsonplaceholder/types/UserDto'

export type GetUserRequest = {
  userId: number
}

export type GetUserResponse200 = {
  body: UserDto
  status: 200
}

export type GetUserResponse = GetUserResponse200

export const getUser =
  (fetchClient: FetchClient) =>
  async (req: GetUserRequest): Promise<GetUserResponse> => {
    const { body, status } = await fetchClient<GetUserResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/users/${req.userId}`,
    })

    if (status === 200) {
      return {
        body: body,
        status: 200,
      }
    }

    throw new Error('Unknown response')
  }
