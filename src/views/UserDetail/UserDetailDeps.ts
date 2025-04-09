import type { UserDetailAlbumPhotosDeps } from '@/views/UserDetail/components/UserDetailAlbumPhotos/UserDetailAlbumPhotosDeps'
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'
import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'
import type { Result } from '@thames/monads'

import { fetchClient } from '@/api/fetchClient'
import { jsonPlaceholderApiClient } from '@/api/jsonplaceholder/jsonPlaceholderApiClient'
import {
  userDetailAlbumPhotosDep,

} from '@/views/UserDetail/components/UserDetailAlbumPhotos/UserDetailAlbumPhotosDeps'
import { getUserAlbumsFactory } from '@/views/UserDetail/deps/getUserAlbumsFactory'
import { getUserDetailInfoFactory } from '@/views/UserDetail/deps/getUserDetailInfoFactory'

export interface UserDetailDeps {
  getUserAlbums: (userId: number) => Promise<Result<IUserAlbum[], string>>
  getUserDetailInfo: (userId: number) => Promise<Result<IUserDetailInfo, string>>
  UserDetailAlbumPhotos: UserDetailAlbumPhotosDeps
}

export const userDetailDeps: UserDetailDeps = {
  getUserAlbums: getUserAlbumsFactory(jsonPlaceholderApiClient(fetchClient).getUserAlbums),
  getUserDetailInfo: getUserDetailInfoFactory(jsonPlaceholderApiClient(fetchClient).getUser),
  UserDetailAlbumPhotos: userDetailAlbumPhotosDep,
}
