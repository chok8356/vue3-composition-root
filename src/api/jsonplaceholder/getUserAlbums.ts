import type { FetchClient } from '@/api/fetchClient'
import type { AlbumDto } from '@/api/jsonplaceholder/types/AlbumDto'

export interface GetUserAlbumsRequest {
  userId: number
}

export type GetUserAlbumsResponse = GetUserAlbumsResponse200

export interface GetUserAlbumsResponse200 {
  body: AlbumDto[]
  status: 200
}

export function getUserAlbums(fetchClient: FetchClient) {
  return async (request: GetUserAlbumsRequest): Promise<GetUserAlbumsResponse> => {
    const { body, status } = await fetchClient<GetUserAlbumsResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/users/${request.userId}/albums`,
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
