import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'browser',
  fromVite: true,
  env: {
    NODE_ENV: 'production',
  },
  unbundle: true,
  dts: {
    vue: true,
  },
  exports: {
    all: true,
  },
  external: ['vue', '@vueuse/core'],
  copy: [
    { from: 'assets', to: 'dist/assets' },
  ],
})
