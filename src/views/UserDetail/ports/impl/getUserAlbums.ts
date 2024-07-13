import type { IUserAlbumDto } from '@/views/UserDetail/ports/impl/dto/IUserAlbumDto'
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'

import axios from 'axios'

export const getUserAlbums = async (id: number): Promise<IUserAlbum[]> => {
  try {
    const { data } = await axios.get<IUserAlbumDto[]>(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`,
    )
    return data.map(mapUserAlbumDtoToUserAlbum)
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
  return []
}

const mapUserAlbumDtoToUserAlbum = (userAlbumDto: IUserAlbumDto): IUserAlbum => {
  return {
    id: userAlbumDto.id,
    title: userAlbumDto.title,
  }
}
