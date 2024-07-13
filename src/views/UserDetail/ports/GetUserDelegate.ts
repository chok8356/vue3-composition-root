import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'
import type { InjectionKey } from 'vue'

export type GetUserDelegate = (userId: number) => Promise<IUserDetailInfo | null>

export const getUserInjectionKey: InjectionKey<GetUserDelegate> = Symbol('getUser')
