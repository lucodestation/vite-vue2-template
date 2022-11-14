import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'

export default {
  plugins: [createVuePlugin()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/global.scss";',
      },
    },
  },
}
