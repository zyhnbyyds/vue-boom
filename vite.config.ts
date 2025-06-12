import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { scripts } from './package.json'

// eslint-disable-next-line node/prefer-global/process
const isProd = process.env.npm_lifecycle_script === scripts.build

export default defineConfig({
  resolve: {
    alias: {
      'vue-boom': resolve(__dirname, './src/index.ts'),
    },
  },
  plugins: [
    Vue(),
    isProd ? null : UnoCSS(),
    AutoImport({
      imports: ['vue-router', '@vueuse/core', 'vue'],
      dts: true,
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),
    Component({
      dts: true,
      dirs: 'src/components',
    }),
  ],
})
