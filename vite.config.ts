import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://savagecore.uk/img/userscript_icon.png',
        namespace: 'savagecore.uk',
        match: [
          'https://www.igdb.com/games/*',
        ],
        "run-at": "document-idle",
        version,
        license: 'Unlicense',
        author: 'SavageCore',
        description: 'Adds a download button to IGDB game cover images for easy downloading of the high-resolution version.',
        updateURL: 'https://github.com/SavageCore/igdb-cover-download/releases/latest/download/igdb-cover-download.meta.js',
        downloadURL: 'https://github.com/SavageCore/igdb-cover-download/releases/latest/download/igdb-cover-download.user.js',
        supportURL: 'https://github.com/SavageCore/igdb-cover-download/issues',
        homepageURL: 'https://github.com/SavageCore/igdb-cover-download',
      },
      build: {
        externalGlobals: {
          // jszip: cdn.unpkg('JSZip', 'dist/jszip.min.js'),
        },
        metaFileName: true,
      },
    }),
  ],
});
