import { test, expect } from '@playwright/test';
import path from 'path';
import { selectors as s } from './helpers/selector';
import { testDoc } from './helpers/data';


const fileAbs = path.resolve(__dirname, testDoc.pathRelative);


test('Single file: upload → process → basic chat smoke', async ({ page }) => {
await page.goto('/');


await page.locator(s.fileInput).setInputFiles(fileAbs);
await page.locator(s.uploadBtn).first().click();


await expect(page.locator(`span:text("${testDoc.filename}")`)).toBeVisible();

await page.locator(s.processBtn).click();
await expect(page.locator(s.statusUnprocessed)).toBeHidden({ timeout: 60_000 });

await page.locator(s.questionBox).fill('What is this document about?');
await page.locator(s.askBtn).click();


const answer = page.locator(s.answerCandidates).first();
await expect(answer).toBeVisible({ timeout: 60_000 });
await expect(answer).not.toHaveText('');


await page.locator(s.deleteBtn).click({ trial: true }).catch(() => {});
});


test('Multiple files: upload 2 files and process first', async ({ page }) => {
await page.goto('/');


const secondAbs = path.resolve(__dirname, './assets/test_uploads.txt');
await page.locator(s.fileInput).setInputFiles([fileAbs, secondAbs]);
await page.locator(s.uploadBtn).first().click();


await expect(page.locator(`span:text("${testDoc.filename}")`)).toBeVisible();
await expect(page.locator('span:text("test_uploads.txt")')).toBeVisible();


// process the first card
await page.locator(s.processBtn).first().click();
await expect(page.locator(s.statusUnprocessed)).toBeHidden({ timeout: 60_000 });
});
