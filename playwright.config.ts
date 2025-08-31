import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';


export default defineConfig({
testDir: './tests',
timeout: 120000,
expect: { timeout: 30_000 },
reporter: [['list'], ['allure-playwright']],
use: {
baseURL: BASE_URL,
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure'
},
projects: [
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
]
});