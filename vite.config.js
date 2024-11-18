import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.mp3', '**/*.png'],
  server: {
    fs: {
      strict: false
    }
  }
});