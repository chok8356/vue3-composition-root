import type { IAlbumPhoto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/types/IAlbumPhoto'
import type { InjectionKey } from 'vue'

export type GetAlbumPhotosDelegate = (albumId: number, page: number) => Promise<IAlbumPhoto[]>

export const getAlbumPhotosInjectionKey: InjectionKey<GetAlbumPhotosDelegate> =
  Symbol('getAlbumPhotos')
