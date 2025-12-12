import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'browser',
  env: {
    NODE_ENV: 'production',
  },
  dts: {
    vue: true,
  },
  exports: {
    all: true,
  },
  plugins: [Vue({ isProduction: true })],
  external: ['vue', '@vueuse/core'],
  copy: [
    { from: 'assets', to: 'dist/assets' },
  ],
})
