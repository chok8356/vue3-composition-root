import type { FetchClient } from '@/api/fetchClient'

import { getAlbumPhotos } from '@/api/jsonplaceholder/getAlbumPhotos'
import { getUser } from '@/api/jsonplaceholder/getUser'
import { getUserAlbums } from '@/api/jsonplaceholder/getUserAlbums'
import { getUsers } from '@/api/jsonplaceholder/getUsers'

export const jsonPlaceholderApiClient = (fetchClient: FetchClient) => {
  return {
    getAlbumPhotos: getAlbumPhotos(fetchClient),
    getUser: getUser(fetchClient),
    getUserAlbums: getUserAlbums(fetchClient),
    getUsers: getUsers(fetchClient),
  }
}
