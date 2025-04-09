import { appDeps } from '@/AppDeps'
import { createApp } from 'vue'

import App from './App.vue'
import { initRouter } from './router'
import './assets/main.css'

const app = createApp(App)

const router = initRouter(appDeps)

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'App'
  next()
})

app.use(router)
app.mount('#app')
