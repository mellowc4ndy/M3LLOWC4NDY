import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base를 './'로 설정하면 어떤 저장소 이름으로 배포하든 경로 문제가 생기지 않습니다.
  base: './', 
  build: {
    outDir: 'dist',
  }
});