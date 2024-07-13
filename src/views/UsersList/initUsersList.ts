import type { App } from 'vue'

import {
  type GetUsersDelegate,
  getUsersInjectionKey,
} from '@/views/UsersList/ports/GetUsersDelegate'

export interface Ports {
  getUsers: GetUsersDelegate
}

export const initUsersList = (app: App, { getUsers }: Ports) => {
  app.provide(getUsersInjectionKey, getUsers)
}
