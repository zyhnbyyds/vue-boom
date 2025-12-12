import { env } from 'node:process'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
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
      dirs: ['./src/components'],
    }),
  ],
})
