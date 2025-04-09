import type {
  GetUserAlbumsRequest,
  GetUserAlbumsResponse,
} from '@/api/jsonplaceholder/getUserAlbums'

export type GetUserAlbumsApiClientDelegate = (
  request: GetUserAlbumsRequest,
) => Promise<GetUserAlbumsResponse>
