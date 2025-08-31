import { test, expect } from '@playwright/test';
import path from 'path';
import { selectors as s } from './helpers/selector';
import { testDoc, sampleQuestions, expectedKeywords } from './helpers/data';


const fileAbs = path.resolve(__dirname, testDoc.pathRelative);


test('Ask at least 5 doc-based questions and verify relevance', async ({ page }) => {
await page.goto('/');
await page.locator(s.fileInput).setInputFiles(fileAbs);
await page.locator(s.uploadBtn).first().click();
await expect(page.locator(`span:text("${testDoc.filename}")`)).toBeVisible();
await page.locator(s.processBtn).click();
await expect(page.locator('text=Unprocessed')).toBeHidden({ timeout: 60_000 });

for (let i = 0; i < sampleQuestions.length; i++) {
await page.locator(s.questionBox).fill(sampleQuestions[i]);
await page.locator(s.askBtn).click();
const answer = page.locator(s.answerCandidates).first();
await expect(answer).toBeVisible({ timeout: 60_000 });
const text = (await answer.innerText()).toLowerCase();

const bucket = expectedKeywords[i] || [];
const hits = bucket.filter(k => text.includes(k));
expect(hits.length, `Answer should include at least one keyword from ${bucket}`).toBeGreaterThan(0);
}
});