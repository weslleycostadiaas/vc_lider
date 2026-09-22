// @lovable.dev/vite-tanstack-config já inclui os plugins necessários.
// Não adicione manualmente React, TanStack Start, Tailwind ou Nitro.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Direciona o servidor SSR para src/server.ts
    server: {
      entry: "server",
    },
  },

  vite: {
    preview: {
      allowedHosts: ["radar.julienesalvan.com.br"],
    },
  },
});
