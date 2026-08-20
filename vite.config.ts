/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,

    coverage: {
      provider: 'v8',

      reporter: [
        'text',
        'html',
      ],

      include: [
        'src/**/*.{ts,tsx}',
      ],

      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/test/**',
        'src/generated/**',
      ],

      thresholds: {
        lines: 35,
        functions: 40,
        branches: 30,
        statements: 35,
      },
    },
  },
});