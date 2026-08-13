import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  workers: 4,
  forbidOnly: true,
  retries: 0,
  reporter: [["line"]],
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
