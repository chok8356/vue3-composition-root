import type { GetAlbumPhotosApiClientDelegate } from '@/api/delegate/GetAlbumPhotosApiClientDelegate'
import type { GetAlbumPhotosResponse200 } from '@/api/jsonplaceholder/getAlbumPhotos'
import type { IAlbumPhoto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/types/IAlbumPhoto'
import type { UserDetailAlbumPhotosDeps } from '@/views/UserDetail/components/UserDetailAlbumPhotos/UserDetailAlbumPhotosDeps'

import { Err, Ok } from '@thames/monads'

export const getAlbumPhotosFactory = (
  getAlbumPhotosApiClient: GetAlbumPhotosApiClientDelegate,
): UserDetailAlbumPhotosDeps['getAlbumPhotos'] => {
  return async (albumId: number, page: number) => {
    try {
      const { body, status } = await getAlbumPhotosApiClient({ albumId, limit: 12, page })
      if (status === 200 && body) {
        return Ok(body.map(mapAlbumPhotoDtoToAlbumPhoto))
      }
      return Err('Server error')
    } catch (error) {
      return Err(`${error}`)
    }
  }
}

const mapAlbumPhotoDtoToAlbumPhoto = (
  albumPhotoDto: GetAlbumPhotosResponse200['body'][number],
): IAlbumPhoto => {
  return {
    id: albumPhotoDto.id,
    thumbnailUrl: albumPhotoDto.thumbnailUrl,
    title: albumPhotoDto.title,
    url: albumPhotoDto.url,
  }
}
