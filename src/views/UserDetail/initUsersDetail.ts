import type { GetAlbumPhotosDelegate } from '@/views/UserDetail/components/UserDetailAlbumPhotos/ports/GetAlbumPhotosDelegate'
import type { App } from 'vue'

import { initUserDetailAlbumPhotos } from '@/views/UserDetail/components/UserDetailAlbumPhotos/initUserDetailAlbumPhotos'
import {
  type GetUserAlbumsDelegate,
  getUserAlbumsInjectionKey,
} from '@/views/UserDetail/ports/GetUserAlbumsDelegate'
import { type GetUserDelegate, getUserInjectionKey } from '@/views/UserDetail/ports/GetUserDelegate'

export interface Ports {
  getAlbumPhotos: GetAlbumPhotosDelegate
  getUser: GetUserDelegate
  getUserAlbums: GetUserAlbumsDelegate
}

export const initUsersDetail = (app: App, { getAlbumPhotos, getUser, getUserAlbums }: Ports) => {
  app.provide(getUserInjectionKey, getUser)
  app.provide(getUserAlbumsInjectionKey, getUserAlbums)
  initUserDetailAlbumPhotos(app, { getAlbumPhotos })
}
