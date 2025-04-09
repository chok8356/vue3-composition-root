import type { GetUserAlbumsApiClientDelegate } from '@/api/delegate/GetUserAlbumsApiClientDelegate'
import type { GetUserAlbumsResponse200 } from '@/api/jsonplaceholder/getUserAlbums'
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'
import type { UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'

import { Err, Ok } from '@thames/monads'

export function getUserAlbumsFactory(getUserAlbumsApiClient: GetUserAlbumsApiClientDelegate): UserDetailDeps['getUserAlbums'] {
  return async (userId: number) => {
    try {
      const { body, status } = await getUserAlbumsApiClient({ userId })
      if (status === 200 && body) {
        return Ok(body.map(x => mapUserAlbumDtoToUserAlbum(x)))
      }
      return Err('Server error')
    }
    catch (error) {
      return Err(`${error}`)
    }
  }
}

function mapUserAlbumDtoToUserAlbum(userAlbumDto: GetUserAlbumsResponse200['body'][number]): IUserAlbum {
  return {
    id: userAlbumDto.id,
    title: userAlbumDto.title,
  }
}
