import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'neutral',
  fromVite: true,
  silent: true,
  dts: {
    vue: true,
  },
  exports: {
    all: true,
  },
  copy: [
    { from: 'src/assets', to: 'dist/assets' },
  ],
})
