import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== new URL(baseURL!).origin) await route.abort();
    else await route.continue();
  });
});

for (const path of [
  "/",
  "/my-ai-workflow/",
  "/categories/linux/",
  "/live-streams/",
]) {
  test(`primary page ${path} has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator("main h1").first()).toBeVisible();
    const results = await new AxeBuilder({ page })
      .exclude("iframe")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      results.violations
        .map((violation) => `${violation.id}: ${violation.help}`)
        .join("\n"),
    ).toEqual([]);
  });
}

test("theme choice persists across navigation", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /switch to/i }).click();
  const expected = before === "light" ? "dark" : "light";
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
  await page.goto("/posts/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
});

test("first taxonomy image is prioritized and later images remain lazy", async ({
  page,
}) => {
  await page.goto("/categories/linux/");
  const images = page.locator(".post-grid .card img");
  await expect(images.first()).toHaveAttribute("loading", "eager");
  await expect(images.first()).toHaveAttribute("fetchpriority", "high");
  await expect(images.first()).not.toHaveAttribute("srcset", /.+/);
  await expect(images.nth(1)).toHaveAttribute("loading", "lazy");
  await expect(images.nth(1)).toHaveAttribute("data-cf-image", "");
  await expect(images.nth(1)).toHaveAttribute("src", /\/images\//);
});

test("article exposes navigation and interactions", async ({
  page,
  isMobile,
}) => {
  await page.goto("/my-ai-workflow/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI");
  const toc = page.locator("[data-responsive-toc]");
  await expect(toc).toBeVisible();
  if (isMobile) await toc.locator("summary").click();
  await expect(toc.locator("[data-toc]")).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy link" })).toBeVisible();
  const image = page.locator(".article-image");
  await expect(image).toHaveAttribute("src", /\/images\//);
  await page.locator("[data-comments]").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("link", { name: /continue the discussion on github/i }),
  ).toBeVisible();
});

test("numeric article headings do not abort site enhancements", async ({
  page,
}) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));
  await page.goto("/windows-24h2/");
  const toc = page.locator("[data-responsive-toc]");
  if (!(await toc.evaluate((element) => element.hasAttribute("open"))))
    await toc.locator("summary").click();
  await expect(
    page.locator('[data-toc] a[href="#24h2-livestream"]'),
  ).toBeVisible();
  await page.locator("[data-comments]").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("link", { name: /continue the discussion on github/i }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("responsive article navigation follows viewport changes", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop projects exercise viewport transitions");
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto("/my-ai-workflow/");
  const toc = page.locator("[data-responsive-toc]");
  await expect(toc).toHaveAttribute("open", "");
  await page.setViewportSize({ width: 800, height: 800 });
  await expect(toc).not.toHaveAttribute("open", "");
  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(toc).toHaveAttribute("open", "");
  await expect(toc.locator("[data-toc]")).toBeVisible();
});

test("live archive paginates and validates player ids", async ({ page }) => {
  await page.goto("/live-streams/");
  await expect(page.locator(".stream-feature")).toHaveCount(1);
  await expect(page.locator(".stream-grid .card")).toHaveCount(24);
  await expect(page.getByRole("link", { name: /older/i })).toHaveAttribute(
    "href",
    "/live-streams/page/2/",
  );
  await page.goto("/live-streams/player/?v=not-a-real-stream");
  await expect(page).toHaveURL(/\/live-streams\/$/);
});

test("newsletter retains required subscription contract", async ({ page }) => {
  await page.goto("/newsletter/");
  const form = page.locator("form[data-newsletter-form]");
  await expect(form).toHaveAttribute(
    "action",
    "https://newsletter.christitus.com/subscribe",
  );
  await expect(form.locator('input[name="list"]')).toHaveValue(
    "BdlkPnowdu7nhx6niCzQUw",
  );
  await expect(form.locator(".g-recaptcha")).toHaveAttribute(
    "data-sitekey",
    /.+/,
  );
  await form.scrollIntoViewIfNeeded();
  await expect(page.locator("[data-recaptcha-status]")).toContainText(
    "Spam protection is unavailable",
  );
});

test("search returns generated index results", async ({ page }) => {
  await page.goto("/search/");
  await page.getByLabel("Search articles").fill("Linux");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.locator("[data-search-status]")).toContainText(/result/i);
  await expect(
    page.locator("[data-search-results] article").first(),
  ).toBeVisible();
});

test("downloads retain an intent-driven store fallback", async ({ page }) => {
  await page.goto("/downloads/");
  const button = page.locator("[data-shopify-load]");
  await expect(button).toBeVisible();
  await expect(
    page.getByRole("link", { name: /browse the ctt store directly/i }),
  ).toHaveAttribute("href", "https://www.cttstore.com/");
  await button.click();
  await expect(button).toHaveText("Store unavailable - try again");
  await expect(
    page.getByRole("link", { name: /browse the ctt store directly/i }),
  ).toBeVisible();
});

test("known player states render and unknown ids redirect", async ({
  page,
  isMobile,
}) => {
  await page.goto("/live-streams/player/?v=wf9rLEjWmPE");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Taking a break",
  );
  await expect(
    page.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=wf9rLEjWmPE");
  await expect(page.locator("#chat-col")).toBeVisible();
  if (!isMobile) {
    const fits = await page.locator("#player-wrapper").evaluate((wrapper) => {
      const chat = wrapper.querySelector("#chat-col")!;
      return (
        chat.getBoundingClientRect().bottom <=
        wrapper.getBoundingClientRect().bottom + 1
      );
    });
    expect(fits).toBe(true);
  }
  await page.goto("/live-streams/player/?v=hF3dAcTSivs");
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
    "Live Stream",
  );
  await expect(page.locator("#chat-col")).toBeHidden();
});

test("legacy redirects resolve", async ({ page }) => {
  await page.goto("/page/1/");
  await expect(page).toHaveURL(/\/$/);
});

test("the not-found page resolves", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-real-page/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "wandered off",
  );
});

test("keyboard users can reach the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("mobile navigation opens with an accessible control", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile project only");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("link", { name: "Newsletter", exact: true }),
  ).toBeVisible();
});
