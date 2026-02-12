import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 상대 경로 배포 설정
  build: {
    outDir: 'dist',
    // rollupOptions 제거: Vite가 자동으로 index.html을 찾도록 맡김
  },
});