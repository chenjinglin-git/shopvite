import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3333,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
