import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    allowedHosts: ['radar.julienesalvan.com.br'],
  },

  preview: {
    host: '0.0.0.0',
    allowedHosts: ['radar.julienesalvan.com.br'],
=======
  nitro: {
    preset: "node-server",
>>>>>>> fc2c5379c537bcd89a20136187a029a4834aee83
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
