import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
   allowedHosts:['5174-sharmmohit-onlinefarmer-k4pqtjyu22.ws-us118.gitpod.io'],
  },
})
