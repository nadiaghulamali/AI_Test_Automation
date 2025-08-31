import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120000,
  use: {
    baseURL: 'http://localhost:5173',  // frontend application
    headless: true,                     
    viewport: { width: 1280, height: 800 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['list'], ['allure-playwright']],
};

export default config;
