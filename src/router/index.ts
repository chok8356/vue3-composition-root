import type { AppDeps } from '@/AppDeps'

import { createRouter, createWebHashHistory } from 'vue-router'

export function initRouter(deps: AppDeps) {
  return createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
      {
        name: 'index',
        path: '/',
        redirect: '/users',
      },
      {
        component: () => import('@/views/UsersList/UsersList.vue'),
        meta: {
          title: 'Users',
        },
        name: 'UsersList',
        path: '/users',
        props: () => {
          return { deps: deps.UsersList }
        },
      },
      {
        children: [
          {
            component: () => import('@/views/UserDetail/UserDetail.vue'),
            meta: {
              title: 'User',
            },
            name: 'UserDetailAlbum',
            path: 'album/:albumId',
          },
        ],
        component: () => import('@/views/UserDetail/UserDetail.vue'),
        meta: {
          title: 'User',
        },
        name: 'UserDetail',
        path: '/users/:userId',
        props: (route) => {
          const routeUserId = route.params.userId
          const routeAlbumId = route.params.albumId
          const userId = typeof routeUserId === 'string' ? Number.parseInt(routeUserId) : undefined
          const albumId
            = typeof routeAlbumId === 'string' ? Number.parseInt(routeAlbumId) : undefined
          return { albumId, deps: deps.UserDetail, userId }
        },
      },
    ],
  })
}
