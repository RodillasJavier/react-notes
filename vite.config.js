/* eslint-disable import/no-extraneous-dependencies */
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
  ],
});
