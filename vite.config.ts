import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    allowedHosts: ['radar.julienesalvan.com.br'],
  },

  preview: {
    host: '0.0.0.0',
    allowedHosts: ['radar.julienesalvan.com.br'],
  },
})