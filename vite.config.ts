import { dirname, resolve } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      'vue-boom': resolve(__dirname, './src/index.ts'),
    },
  },
  plugins: [
    Vue(),
    env.npm_lifecycle_script === pkg.scripts.build ? [] : UnoCSS(),
    AutoImport({
      imports: ['vue-router', '@vueuse/core', 'vue'],
      dts: true,
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),
    Component({
      dts: true,
    }),
  ],
})
