import type {
  GetUserAlbumsRequest,
  GetUserAlbumsResponse,
} from '@/api/jsonplaceholder/getUserAlbums'

export type GetUserAlbumsApiClientDelegate = (
  req: GetUserAlbumsRequest,
) => Promise<GetUserAlbumsResponse>
