import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'neutral',
  fromVite: true,
  dts: {
    vue: true,
  },
  exports: {
    all: true,
  },
  external: ['vue', '@vueuse/core'],
  copy: [
    { from: 'src/assets', to: 'dist/assets' },
  ],
})
