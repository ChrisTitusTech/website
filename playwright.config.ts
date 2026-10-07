import { defineConfig, devices } from "@playwright/test";

const port = process.env.SITE_TEST_PORT ?? "4321";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  workers: 4,
  forbidOnly: true,
  retries: 0,
  reporter: [["line"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
