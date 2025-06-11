import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'vue-boom': fileURLToPath(new URL('../packages/vue-boom/dist', import.meta.url)),
    },
  },
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue-router', '@vueuse/core'],
      dts: true,
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),
  ],
})
