import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [createVuePlugin()],
  server: {
    host: '0.0.0.0',
  },
}
