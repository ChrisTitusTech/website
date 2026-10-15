import { expect, test } from "@playwright/test";

for (const route of [
  "/encore-bandit-connection/",
  "/privacy/",
  "/downloads/",
]) {
  for (const theme of ["dark", "light"]) {
    test(`${route} has usable content and TOC in ${theme} theme`, async ({
      page,
    }) => {
      await page.route("**/*", (route) => {
        if (new URL(route.request().url()).hostname !== "127.0.0.1")
          return route.abort();
        return route.continue();
      });
      await page.goto(route);
      await page.evaluate((theme) => {
        document.documentElement.setAttribute("data-theme", theme);
      }, theme);
      const toc = page.locator("[data-responsive-toc]");
      await expect(toc).toBeVisible();
      if (!(await toc.evaluate((element) => element.hasAttribute("open"))))
        await toc.locator("summary").click();
      const firstLink = toc.locator("a").first();
      const href = await firstLink.getAttribute("href");
      await firstLink.click();
      expect(new URL(page.url()).hash).toBe(href);
      const geometry = await page
        .locator(".article-shell")
        .evaluate((shell) => {
          const content = shell
            .querySelector(".reading")!
            .getBoundingClientRect();
          return {
            width: content.width,
            shellWidth: shell.getBoundingClientRect().width,
            documentWidth: document.documentElement.scrollWidth,
            viewport: window.innerWidth,
          };
        });
      expect(geometry.width).toBeGreaterThan(geometry.shellWidth / 2);
      expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewport);
    });
  }
}

test("heading-free articles retain the full content width", async ({
  page,
}) => {
  await page.goto("/encore-bandit-connection/");
  await page.locator(".article-toc").evaluate((element) => element.remove());
  const widths = await page.locator(".article-shell").evaluate((shell) => ({
    shell: shell.getBoundingClientRect().width,
    content: shell.querySelector(".reading")!.getBoundingClientRect().width,
  }));
  expect(widths.content).toBeCloseTo(widths.shell, 0);
});
