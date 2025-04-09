import type { FetchClient } from '@/api/fetchClient'
import type { AlbumPhotoDto } from '@/api/jsonplaceholder/types/AlbumPhotoDto'

export type GetAlbumPhotosRequest = {
  albumId: number
  limit: number
  page: number
}

export type GetAlbumPhotosResponse = GetAlbumPhotosResponse200

export type GetAlbumPhotosResponse200 = {
  body: AlbumPhotoDto[]
  status: 200
}

export const getAlbumPhotos =
  (fetchClient: FetchClient) =>
  async (request: GetAlbumPhotosRequest): Promise<GetAlbumPhotosResponse> => {
    const { body, status } = await fetchClient<GetAlbumPhotosResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/albums/${request.albumId}/photos?_page=${request.page}&_limit=${request.limit}`,
    })

    if (status === 200) {
      return {
        body: body,
        status: 200,
      }
    }

    throw new Error('Unknown response')
  }
