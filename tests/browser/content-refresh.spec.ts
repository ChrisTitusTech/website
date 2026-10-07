import { expect, test } from "@playwright/test";

test("long historical article URLs remain inside the mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/wsl2/");
  await expect(
    page.getByRole("link", {
      name: "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi",
      exact: true,
    }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.goto("/windows-update-security-only/");
  await expect(
    page.locator("code").filter({ hasText: "HKEY_LOCAL_MACHINE" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
});
