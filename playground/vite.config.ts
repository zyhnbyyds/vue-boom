import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'vue-boom': resolve(__dirname, '../packages/vue-boom/src/index.ts'),
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
