import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tic-tac-toe-endless/',
  server: {
    port: 3000,
    host: true,
    allowedHosts: true
  }
})
