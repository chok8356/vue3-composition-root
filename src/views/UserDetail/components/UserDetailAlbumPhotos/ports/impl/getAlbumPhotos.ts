import type { IAlbumPhotoDto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/ports/impl/dto/IAlbumPhotoDto'
import type { IAlbumPhoto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/types/IAlbumPhoto'

import axios from 'axios'

export const getAlbumPhotos = async (id: number, page: number): Promise<IAlbumPhoto[]> => {
  try {
    const { data } = await axios.get<IAlbumPhotoDto[]>(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=${page}&_limit=12`,
    )
    return data.map(mapAlbumPhotoDtoToAlbumPhoto)
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
  return []
}

const mapAlbumPhotoDtoToAlbumPhoto = (AlbumPhotoDto: IAlbumPhotoDto): IAlbumPhoto => {
  return {
    id: AlbumPhotoDto.id,
    thumbnailUrl: AlbumPhotoDto.thumbnailUrl,
    title: AlbumPhotoDto.title,
    url: AlbumPhotoDto.url,
  }
}
