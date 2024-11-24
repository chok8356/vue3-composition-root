import type { FetchClient } from '@/api/fetchClient'
import type { AlbumPhotoDto } from '@/api/jsonplaceholder/types/AlbumPhotoDto'

export type GetAlbumPhotosRequest = {
  albumId: number
  limit: number
  page: number
}

export type GetAlbumPhotosResponse200 = {
  body: AlbumPhotoDto[]
  status: 200
}

export type GetAlbumPhotosResponse = GetAlbumPhotosResponse200

export const getAlbumPhotos =
  (fetchClient: FetchClient) =>
  async (req: GetAlbumPhotosRequest): Promise<GetAlbumPhotosResponse> => {
    const { body, status } = await fetchClient<GetAlbumPhotosResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/albums/${req.albumId}/photos?_page=${req.page}&_limit=${req.limit}`,
    })

    if (status === 200) {
      return {
        body: body,
        status: 200,
      }
    }

    throw new Error('Unknown response')
  }
