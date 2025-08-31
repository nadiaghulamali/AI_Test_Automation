import { test, expect } from '@playwright/test';

test('dummy test to check setup', async ({ page }) => {
  await page.goto('/');
  expect(page.url()).toContain('5173');
});