import type {
  GetAlbumPhotosRequest,
  GetAlbumPhotosResponse,
} from '@/api/jsonplaceholder/getAlbumPhotos'

export type GetAlbumPhotosApiClientDelegate = (
  request: GetAlbumPhotosRequest,
) => Promise<GetAlbumPhotosResponse>
