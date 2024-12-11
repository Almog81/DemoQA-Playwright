// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://demoqa.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Extra HTTP headers for API requests */
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    /* Action timeout for API requests */
    actionTimeout: 10000,

    /* BLOCK ADS */
    context: {
      blockedResourceTypes: ['image', 'media', 'font', 'other'],
      blockDomains: ['*google*', '*doubleclick.net*', '*facebook*']
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-tests',
      testMatch: '**/ApiTest/**/*.spec.js',
      testIgnore: '**/DemoQa/**/*.spec.js',
      use: {
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        actionTimeout: 30000,
        navigationTimeout: 30000,
        retries: 2,
      },
    },
    {
      name: 'ui-tests',
      testMatch: '**/DemoQa/**/*.spec.js',
      testIgnore: '**/ApiTest/**/*.spec.js',
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
      testMatch: '**/DemoQa/**/*.spec.js',
      testIgnore: '**/ApiTest/**/*.spec.js',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/DemoQa/**/*.spec.js',
      testIgnore: '**/ApiTest/**/*.spec.js',
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Test against mobile viewports */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: '**/DemoQa/**/*.spec.js',
      testIgnore: '**/ApiTest/**/*.spec.js',
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: '**/DemoQa/**/*.spec.js',
      testIgnore: '**/ApiTest/**/*.spec.js',
    },
  ],

});

