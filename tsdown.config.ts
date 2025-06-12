import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'neutral',
  fromVite: true,
  define: {
    'process.env.NODE_ENV': 'production',
  },
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
