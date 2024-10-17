// playwright.config.js
module.exports = {
    use: {
      baseURL: 'http://paytest.dev:5000', // Update with your mock API base URL if needed
      browserName: 'chromium',           // Default browser
      headless: true                     // Run headless mode
    },
    testDir: './tests',                  // Directory where test files are located
    timeout: 30000,                      // Test timeout of 30 seconds
  };
  