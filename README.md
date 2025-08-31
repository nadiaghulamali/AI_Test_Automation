# QnAService Automation Tests

This repository contains **Playwright UI and API automation tests** for the QnAService (RAG application).  
The tests cover file upload, document processing, and Q&A functionality. The test pipeline is Dockerized and includes reporting via Allure.

---

## How to Run Tests

### 1. Local Setup

1. Clone the repository:

```bash
git clone https://github.com/nadiaghulamali/AI_Test_Automation.git
cd AI_Test_Automation

2. Install dependencies:

    npm install

3. Install Playwright browsers:

    npx playwright install

4. Create a .env file with required environment variables:

        BASE_URL=http://localhost:8000
        OPENAI_API_KEY=your_openai_api_key_here

5. Run tests:

    npx playwright test tests/ui.spec.ts
    npx playwright test tests/api.spec.ts

6. Run all tests:

    npx playwright test

### 2. Running Tests in Docker

    docker-compose up --build

###3. CI/CD Pipelines

    Configure environment variables (BASE_URL, OPENAI_API_KEY) in the CI/CD environment.

    Ensure Docker is available in the pipeline for consistent test execution.

    Run tests using:

    docker-compose run --rm tests

    Advantages & Disadvantages

Advantages:

    Full coverage with UI + API tests

    Dockerized pipeline ensures consistent environments

    Allure reporting provides readable test reports

    Environment variables make the pipeline flexible and secure

Disadvantages:

    Requires backend application to be running for tests to pass

    Large documents may increase test execution time

    Network latency or slow responses may require additional wait handling in UI tests

    Real OpenAI API calls require valid API keys, which cannot be committed to Git

Found Bugs / Issues

Upload button initially disabled in UI

Steps to reproduce: Open the app, file input appears but the upload button is disabled for a few seconds.

Workaround: Tests include a wait for the button to become enabled.

Backend 422 errors on malformed uploads

Steps to reproduce: Upload an empty file or invalid format.

Workaround: Validate files before uploading in the tests.

Chat sometimes returns generic answers before document processing completes

Steps to reproduce: Upload a document and immediately ask a question.

Workaround: Tests include waiting for the document to be processed.

Multiple documents handling edge case

Uploading multiple documents simultaneously may fail if the API is slow.

Workaround: Tests currently upload sequentially to ensure processing.

Notes

Make sure the .env file is added to .gitignore to prevent leaking sensitive API keys.

The pipeline is designed to run both locally and inside Docker for CI/CD readiness.

Reports are generated in Allure format, which can be visualized with:

    allure generate allure-results --clean -o allure-report
    allure open allure-report
