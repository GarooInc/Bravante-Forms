import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    nodePolyfills({
      // Polyfills requeridos por html-to-docx en el browser
      include: ['buffer', 'stream', 'util', 'events', 'crypto', 'path', 'url', 'http', 'https', 'zlib', 'fs'],
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
})