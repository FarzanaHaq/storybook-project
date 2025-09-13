/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/experimental-addon-vitest';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',                // ✅ for React Testing Library
    setupFiles: './src/setupTests.ts',   // ✅ your own setup
    include: ['src/**/*.test.{ts,tsx}'], // ✅ your unit/component tests

    // Add Storybook test project
    projects: [
      {
        extends: true, // inherit globals/environment/etc.
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'), // Storybook config
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright', // runs in Playwright browser
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'], // Storybook test setup
        },
      },
    ],
  },
});
