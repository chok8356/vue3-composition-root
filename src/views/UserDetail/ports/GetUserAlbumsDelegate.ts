import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'
import type { InjectionKey } from 'vue'

export type GetUserAlbumsDelegate = (userId: number) => Promise<IUserAlbum[]>

export const getUserAlbumsInjectionKey: InjectionKey<GetUserAlbumsDelegate> =
  Symbol('getUserAlbums')
