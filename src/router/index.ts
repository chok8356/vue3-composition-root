import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
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
        const userId = typeof routeUserId === 'string' ? parseInt(routeUserId) : null
        const albumId = typeof routeAlbumId === 'string' ? parseInt(routeAlbumId) : null
        return { albumId, userId }
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'App'
  next()
})

export default router
