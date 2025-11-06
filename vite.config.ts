import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/251106/', // GitHub Pages 배포용 (저장소: https://github.com/YOO1-T/251106)
})

