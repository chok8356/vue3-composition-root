import type { IAlbumPhoto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/types/IAlbumPhoto'
import type { Result } from '@thames/monads'

import { fetchClient } from '@/api/fetchClient'
import { jsonPlaceholderApiClient } from '@/api/jsonplaceholder/jsonPlaceholderApiClient'
import { getAlbumPhotosFactory } from '@/views/UserDetail/components/UserDetailAlbumPhotos/deps/getAlbumPhotosFactory'

export interface UserDetailAlbumPhotosDeps {
  getAlbumPhotos: (albumId: number, page: number) => Promise<Result<IAlbumPhoto[], string>>
}

export const userDetailAlbumPhotosDep: UserDetailAlbumPhotosDeps = {
  getAlbumPhotos: getAlbumPhotosFactory(jsonPlaceholderApiClient(fetchClient).getAlbumPhotos),
}
