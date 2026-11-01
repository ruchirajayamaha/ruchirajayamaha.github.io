import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rolldownOptions: {
      output: {
        // Vite 8 bundles with Rolldown, which rejects the object form of `manualChunks`.
        codeSplitting: {
          groups: [
            { name: 'vendor-katex', test: /node_modules[\\/]katex/ },
            { name: 'vendor-motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)/ },
            { name: 'vendor-icons', test: /node_modules[\\/]lucide-react/ },
          ],
        },
      },
    },
  },
});
