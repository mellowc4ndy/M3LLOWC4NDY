import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/M3LLOWC4NDY/', // GitHub Repository 이름과 일치해야 합니다.
});
