import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port: 5174
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sw: 'src/sw.ts'
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name === 'sw') return 'sw.js'
          return '[name].js'
        }
      }
    }
  },
})
