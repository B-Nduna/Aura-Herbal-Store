import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'aura-herbal-store' with your exact GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/aura-herbal-store/', 
})