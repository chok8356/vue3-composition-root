import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  let base = '/'
  let generateScopedName = '[local]--[hash:base64:5]'

  if (isProduction) {
    base = '/vue3-composition-root/'
    generateScopedName = '[hash:base64:5]'
  }

  return {
    base,
    css: {
      modules: {
        generateScopedName,
        localsConvention: 'camelCaseOnly',
      },
    },
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
    },
  }
})
