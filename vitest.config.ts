import { fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig(configEnvironment =>
  mergeConfig(viteConfig(configEnvironment), {
    test: {
      clearMocks: true,
      coverage: {
        branches: 80,
        enabled: true,
        exclude: ['**/__stories__/**', '**/__tests__/**'],
        functions: 80,
        include: ['src/components/**/*.vue', 'src/views/**/*.vue'],
        lines: 80,
        perFile: true,
        reporter: ['html'],
        statements: 80,
      },
      css: {
        modules: {
          classNameStrategy: 'non-scoped',
        },
      },
      environment: 'happy-dom',
      globals: true,
      include: ['./src/**/*.spec.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./vitest.setup.ts'],
      watch: false,
    },
  }),
)
