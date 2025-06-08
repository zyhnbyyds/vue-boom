import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  const isTsDownBuilding = import.meta.env?.npm_lifecycle_script === 'tsdown --env.NODE_ENV=production'

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      AutoImport({
        imports: [
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),
      isTsDownBuilding ? null : UnoCSS(),
      Vue(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
