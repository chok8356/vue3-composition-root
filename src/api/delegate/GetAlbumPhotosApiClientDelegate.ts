import type {
  GetAlbumPhotosRequest,
  GetAlbumPhotosResponse,
} from '@/api/jsonplaceholder/getAlbumPhotos'

export type GetAlbumPhotosApiClientDelegate = (
  req: GetAlbumPhotosRequest,
) => Promise<GetAlbumPhotosResponse>
