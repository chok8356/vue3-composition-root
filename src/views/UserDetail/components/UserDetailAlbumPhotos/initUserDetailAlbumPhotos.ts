import type { App } from 'vue'

import {
  type GetAlbumPhotosDelegate,
  getAlbumPhotosInjectionKey,
} from '@/views/UserDetail/components/UserDetailAlbumPhotos/ports/GetAlbumPhotosDelegate'

interface Ports {
  getAlbumPhotos: GetAlbumPhotosDelegate
}

export const initUserDetailAlbumPhotos = (app: App, { getAlbumPhotos }: Ports) => {
  app.provide(getAlbumPhotosInjectionKey, getAlbumPhotos)
}
