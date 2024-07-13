import type { IUserList } from '@/views/UsersList/types/IUserList'
import type { InjectionKey } from 'vue'

export type GetUsersDelegate = () => Promise<IUserList[]>

export const getUsersInjectionKey: InjectionKey<GetUsersDelegate> = Symbol('getUsers')
