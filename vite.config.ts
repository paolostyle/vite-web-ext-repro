import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';

const getManifestFile = (browser?: string) => {
  switch (browser) {
    case 'chrome':
    default:
      return 'manifest.chrome.json';
    case 'firefox':
      return 'manifest.firefox.json';
  }
};

const isWSL = !!process.env.WSL_DISTRO_NAME;

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: getManifestFile(process.env.BROWSER),
      webExtConfig: isWSL ? { chromiumBinary: '/usr/bin/google-chrome-stable' } : undefined,
    }),
  ],
});
