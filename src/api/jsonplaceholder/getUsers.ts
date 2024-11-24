import type { FetchClient } from '@/api/fetchClient'
import type { UserDto } from '@/api/jsonplaceholder/types/UserDto'

export type GetUsersResponse200 = {
  body: UserDto[]
  status: 200
}

export type GetUsersResponse = GetUsersResponse200

export const getUsers = (fetchClient: FetchClient) => async (): Promise<GetUsersResponse> => {
  const { body, status } = await fetchClient<GetUsersResponse['body']>({
    method: 'GET',
    path: 'https://jsonplaceholder.typicode.com/users',
  })

  if (status === 200) {
    return {
      body: body,
      status: 200,
    }
  }

  throw new Error('Unknown response')
}
