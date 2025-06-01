import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-rails';
import ViteReact from '@vitejs/plugin-react';
import VitePluginWindicss from 'vite-plugin-windicss';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    RubyPlugin({
      fullReload: {
        additionalPaths: ['app/frontend/**/*']
      }
    }),
    ViteReact(),
    VitePluginWindicss({
      root: __dirname,
      scan: {
        fileExtensions: ['erb', 'html', 'vue', 'jsx', 'tsx'], // and maybe haml
        dirs: ['app/views', 'app/frontend'], // or app/javascript
      },
    })
  ],
})
