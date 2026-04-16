import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';

/**
 * Auto-descobre todas as pastas em src/mockups/ que contêm index.html
 * e as registra como entry points MPA independentes.
 *
 * Output: dist/src/mockups/{id}/index.html → servido em /src/mockups/{id}/
 * Para adicionar um mockup: criar src/mockups/{id}/index.html — zero config aqui.
 */
function discoverMockupEntries(): Record<string, string> {
  const mockupsDir = resolve(__dirname, 'src/mockups');
  const entries: Record<string, string> = {};

  try {
    readdirSync(mockupsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .forEach((d) => {
        const html = resolve(mockupsDir, d.name, 'index.html');
        if (existsSync(html)) entries[d.name] = html;
      });
  } catch {
    /* src/mockups ainda sem subpastas — build inicial seguro */
  }

  return entries;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      input: {
        // Entry principal da casca
        main: resolve(__dirname, 'index.html'),
        // Entries MPA dos mockups — descobertos automaticamente
        ...discoverMockupEntries(),
      },
      output: {
        manualChunks(id) {
          // framer-motion só é consumido pela casca; isola-o do bundle principal
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
        },
      },
    },
  },
});
