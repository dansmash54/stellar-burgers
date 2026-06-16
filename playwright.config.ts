import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start -- --no-client-overlay',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
  },
});