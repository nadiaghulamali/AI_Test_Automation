import { test, expect, request as playwrightRequest } from '@playwright/test';
import fs from 'fs';

const API_URL = 'http://localhost:8000';

test('RAG API - upload, process, and ask question', async () => {
  const apiContext = await playwrightRequest.newContext();

  // Upload
  const uploadRes = await apiContext.post(`${API_URL}/documents/upload/`, {
    multipart: {
      file: {
        name: 'challengeOverview.txt',
        mimeType: 'text/markdown',
        buffer: fs.readFileSync('tests/assets/challengeOverview.txt'),
      },
    },
  });
  expect(uploadRes.ok()).toBe(true);
  const uploadData = await uploadRes.json();
  const docId = uploadData.id;
  expect(uploadData.processed).toBe(false);

  // Process
  const processRes = await apiContext.post(`${API_URL}/documents/process/${docId}`);
  expect(processRes.ok()).toBe(true);

  // Confirm processed
  const docRes = await apiContext.get(`${API_URL}/documents/${docId}`);
  const docData = await docRes.json();
  expect(docData.processed).toBe(true);

  // Ask question
  const qnaRes = await apiContext.post(`${API_URL}/qna/`, {
    data: { question: 'Summarize this document' },
  });
  expect(qnaRes.ok()).toBe(true);
  const qnaData = await qnaRes.json();
  expect(qnaData.answer).toBeDefined();
});
