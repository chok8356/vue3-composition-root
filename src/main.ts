import { getAlbumPhotos } from '@/views/UserDetail/components/UserDetailAlbumPhotos/ports/impl/getAlbumPhotos'
import { initUsersDetail } from '@/views/UserDetail/initUsersDetail'
import { getUser } from '@/views/UserDetail/ports/impl/getUser'
import { getUserAlbums } from '@/views/UserDetail/ports/impl/getUserAlbums'
import { initUsersList } from '@/views/UsersList/initUsersList'
import { getUsers } from '@/views/UsersList/ports/impl/getUsers'
import { createApp } from 'vue'

import App from './app.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(router)

initUsersList(app, { getUsers })
initUsersDetail(app, { getAlbumPhotos, getUser, getUserAlbums })

app.mount('#app')
