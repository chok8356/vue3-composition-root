import type { FetchClient } from '@/api/fetchClient'
import type { AlbumDto } from '@/api/jsonplaceholder/types/AlbumDto'

export type GetUserAlbumsRequest = {
  userId: number
}

export type GetUserAlbumsResponse200 = {
  body: AlbumDto[]
  status: 200
}

export type GetUserAlbumsResponse = GetUserAlbumsResponse200

export const getUserAlbums =
  (fetchClient: FetchClient) =>
  async (req: GetUserAlbumsRequest): Promise<GetUserAlbumsResponse> => {
    const { body, status } = await fetchClient<GetUserAlbumsResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/users/${req.userId}/albums`,
    })

    if (status === 200) {
      return {
        body: body,
        status: 200,
      }
    }

    throw new Error('Unknown response')
  }
