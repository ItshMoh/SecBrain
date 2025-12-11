import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // Tailwind v4 Vite plugin

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
