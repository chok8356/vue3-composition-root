import type { FetchClient } from '@/api/fetchClient'
import type { AlbumPhotoDto } from '@/api/jsonplaceholder/types/AlbumPhotoDto'

export interface GetAlbumPhotosRequest {
  albumId: number
  limit: number
  page: number
}

export type GetAlbumPhotosResponse = GetAlbumPhotosResponse200

export interface GetAlbumPhotosResponse200 {
  body: AlbumPhotoDto[]
  status: 200
}

export function getAlbumPhotos(fetchClient: FetchClient) {
  return async (request: GetAlbumPhotosRequest): Promise<GetAlbumPhotosResponse> => {
    const { body, status } = await fetchClient<GetAlbumPhotosResponse['body']>({
      method: 'GET',
      path: `https://jsonplaceholder.typicode.com/albums/${request.albumId}/photos?_page=${request.page}&_limit=${request.limit}`,
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
