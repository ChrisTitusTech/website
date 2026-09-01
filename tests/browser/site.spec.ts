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
  "/downloads/",
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

test("listing cards use the compact mobile layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/categories/linux/");
  const firstCard = page.locator(".listing-page .card").first();
  await expect(firstCard.locator(".card-body > p:not(.meta)")).toBeVisible();
  await expect(firstCard.locator(".card-body > .chips")).toBeVisible();
  await expect(firstCard).toHaveCSS("display", "grid");
  await expect(firstCard).toHaveCSS("grid-template-columns", /^112px /);
  await expect(firstCard.locator("img")).toHaveCSS("width", "112px");
  await expect(firstCard.locator("img")).toHaveCSS("height", "112px");

  await page.setViewportSize({ width: 320, height: 844 });
  await expect(firstCard).toHaveCSS("grid-template-columns", /^88px /);
  await expect(firstCard.locator("img")).toHaveCSS("width", "88px");
  await expect(firstCard.locator(".card-body > p:not(.meta)")).toBeVisible();
  expect(
    await firstCard.evaluate((card) => card.scrollWidth <= card.clientWidth),
  ).toBe(true);

  await page.setViewportSize({ width: 900, height: 900 });
  await expect(firstCard.locator(".card-body > p:not(.meta)")).toBeVisible();
  await expect(firstCard.locator(".card-body > .chips")).toBeVisible();
  await expect(firstCard).toHaveCSS("display", "flex");
  await expect(firstCard.locator("img")).toHaveCSS("aspect-ratio", "16 / 9");
  expect(
    await firstCard.locator("img").evaluate((image) => image.clientWidth),
  ).toBeGreaterThan(112);
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

test("article table of contents scrolls away with the page on desktop", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "the mobile table of contents is intentionally inline");
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto("/my-ai-workflow/");
  const toc = page.locator(".article-toc");
  await expect(toc).not.toHaveCSS("position", "sticky");
  const initialTop = await toc.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await expect
    .poll(() => toc.evaluate((element) => element.getBoundingClientRect().top))
    .toBeLessThan(initialTop);
});

test("live archive paginates and validates player ids", async ({ page }) => {
  await page.goto("/live-streams/");
  await expect(page.locator(".stream-feature")).toHaveCount(1);
  await expect(page.locator(".stream-grid .card")).toHaveCount(24);
  await expect(page.getByRole("link", { name: /older/i })).toHaveAttribute(
    "href",
    "/live-streams/page/2/",
  );
  await expect(page.locator('head link[rel="next"]')).toHaveAttribute(
    "href",
    "https://christitus.com/live-streams/page/2/",
  );
  await page.goto("/live-streams/page/2/");
  await expect(page.locator('head link[rel="prev"]')).toHaveAttribute(
    "href",
    "https://christitus.com/live-streams/",
  );
  await expect(page.locator('head link[rel="next"]')).toHaveAttribute(
    "href",
    "https://christitus.com/live-streams/page/3/",
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

test("search returns generated index results", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Toggle search" }).click();
  await expect(page.locator("[data-search-extra]")).toBeHidden();
  await page.getByLabel("Search articles").fill("Linux");
  await expect(page.locator("[data-search-extra]")).toBeVisible();
  await expect(page.locator("[data-search-status]")).toContainText(/result/i);
  await expect(page.locator("[data-search-result]").first()).toBeVisible();
  const communitySearch = page.getByRole("link", {
    name: "Search the community for “Linux”",
  });
  await expect(communitySearch).toHaveAttribute(
    "href",
    "https://forum.christitus.com/search?q=Linux",
  );
  await page.getByLabel("Search articles").fill("");
  await expect(page.locator("[data-search-extra]")).toBeHidden();
  await expect(page.locator("[data-search-result]")).toHaveCount(0);
  await expect(page.locator("[data-search-status]")).toHaveText(
    "Enter a search term.",
  );
});

test("clearing search ignores a delayed completion", async ({
  page,
  isMobile,
}) => {
  let release!: () => void;
  const delayed = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/index.json", async (route) => {
    await delayed;
    await route.continue();
  });
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Toggle search" }).click();
  await page.getByLabel("Search articles").fill("Linux");
  await expect(page.locator("[data-search-status]")).toHaveText(
    "Loading search index...",
  );
  await page.getByLabel("Search articles").fill("");
  release();
  await expect(page.locator("[data-search-status]")).toHaveText(
    "Enter a search term.",
  );
  await expect(page.locator("[data-search-result]")).toHaveCount(0);
});

test("concurrent searches share the pending index request", async ({
  page,
  isMobile,
}) => {
  let requestCount = 0;
  let release!: () => void;
  const delayed = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/index.json", async (route) => {
    requestCount += 1;
    await delayed;
    await route.continue();
  });
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Toggle search" }).click();
  const input = page.getByLabel("Search articles");
  await input.fill("Lin");
  await expect.poll(() => requestCount).toBe(1);
  await input.fill("Linux");
  await page.waitForTimeout(300);
  expect(requestCount).toBe(1);
  release();
  await expect(page.locator("[data-search-result]").first()).toBeVisible();
});

test("replacing a query invalidates results during the debounce delay", async ({
  page,
  isMobile,
}) => {
  let release!: () => void;
  const delayed = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/index.json", async (route) => {
    await delayed;
    await route.fulfill({
      json: [
        {
          title: "Linux only",
          tags: [],
          categories: [],
          contents: "",
          permalink: "/linux/",
        },
        {
          title: "Windows only",
          tags: [],
          categories: [],
          contents: "",
          permalink: "/windows/",
        },
      ],
    });
  });
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Toggle search" }).click();
  const input = page.getByLabel("Search articles");
  await input.fill("Linux");
  await expect(page.locator("[data-search-status]")).toHaveText(
    "Loading search index...",
  );
  await input.fill("Windows");
  release();
  await page.waitForTimeout(100);
  await expect(page.locator("[data-search-result]")).toHaveCount(0);
  await expect(page.locator("[data-search-result]")).toHaveText([
    "Windows only",
  ]);
});

test("search traps focus while its extra controls are hidden", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Toggle search" }).click();
  const input = page.getByLabel("Search articles");
  await expect(input).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(input).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(input).toBeFocused();
});

test("search restores focus to a visible toggle after a breakpoint change", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto("/");
  const desktopToggle = page.locator(".search-toggle-desktop");
  const mobileToggle = page.locator(".search-toggle-mobile");
  await desktopToggle.click();
  await page.setViewportSize({ width: 900, height: 800 });
  await expect(desktopToggle).toBeHidden();
  await expect(mobileToggle).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(mobileToggle).toBeFocused();
});

test("clicking the search backdrop closes it", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const toggle = page.getByRole("button", { name: "Toggle search" });
  await toggle.click();
  const panel = page.locator("[data-search-panel]");
  await expect(panel).toBeVisible();
  await panel.click({ position: { x: 10, y: 10 } });
  await expect(panel).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("homepage and article lists preserve heading levels and lazy images", async ({
  page,
}) => {
  await page.goto("/");
  const featured = page
    .getByRole("heading", { name: "Featured" })
    .locator("..");
  await expect(featured.locator(".post-grid h3")).toHaveCount(3);
  const latest = page
    .getByRole("heading", { name: "Latest articles" })
    .locator("..");
  await expect(latest.locator(".post-grid .card h3").first()).toBeVisible();
  await expect(latest.locator(".post-grid .card img").first()).toHaveAttribute(
    "loading",
    "lazy",
  );
  await page.goto("/my-ai-workflow/");
  const related = page
    .getByRole("heading", { name: "Related articles" })
    .locator("..");
  await expect(related.locator(".post-grid .card h3").first()).toBeVisible();
  await expect(related.locator(".post-grid .card img").first()).toHaveAttribute(
    "loading",
    "lazy",
  );
});

test("taxonomy and head pagination expose complete navigation", async ({
  page,
}) => {
  await page.goto("/archive/");
  await expect(page.locator(".post-grid .card").first()).toBeVisible();
  await page.goto("/categories/");
  await expect(
    page.locator('link[type="application/rss+xml"]'),
  ).toHaveAttribute("href", "https://christitus.com/categories/index.xml");
  await expect(
    page.getByRole("navigation", { name: "Pagination" }).locator(".is-current"),
  ).toHaveText("1");
  await expect(page.getByRole("link", { name: /older/i })).toHaveAttribute(
    "href",
    "/categories/page/2/",
  );
  await page.goto("/posts/page/2/");
  const breadcrumbItems = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? "{}"))
        .flatMap((value) => value["@graph"] ?? [])
        .find((value) => value["@type"] === "BreadcrumbList")
        ?.itemListElement.map((item) => item.item),
    );
  expect(breadcrumbItems).not.toContain("https://christitus.com/posts/page/");
  expect(breadcrumbItems?.at(-1)).toBe("https://christitus.com/posts/page/2/");
  await expect(page.locator('head link[rel="prev"]')).toHaveAttribute(
    "href",
    "https://christitus.com/posts/",
  );
  await expect(page.locator('head link[rel="next"]')).toHaveAttribute(
    "href",
    "https://christitus.com/posts/page/3/",
  );
  await page.goto("/my-ai-workflow/");
  await expect(page.locator('link[type="application/rss+xml"]')).toHaveCount(0);
});

test("downloads provide a first-party CTT Store handoff", async ({ page }) => {
  await page.goto("/downloads/");
  const store = page.locator("[data-store-handoff]");
  await expect(store).toBeVisible();
  await expect(store.getByRole("heading", { level: 2 })).toContainText(
    "Digital products and guides",
  );
  await expect(store.locator(".heading-link")).toHaveCount(0);
  await expect(
    store.getByRole("link", { name: "Browse the CTT Store" }),
  ).toHaveAttribute("href", "https://cttstore.com/");
  await expect(
    store.getByRole("link", { name: "Access your purchases" }),
  ).toHaveAttribute("href", "https://cttstore.com/account");
  await expect(
    store.getByRole("link", { name: /Windows Toolbox/i }),
  ).toHaveAttribute("href", "https://cttstore.com/products/windows-toolbox");
  await expect(
    store.getByRole("link", { name: /The Linux Desktop Guide/i }),
  ).toHaveAttribute(
    "href",
    "https://cttstore.com/products/the-linux-desktop-guide-1",
  );
  await expect(page.locator("[data-shopify-load]")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Windows Utility support" }),
  ).toHaveAttribute("href", "https://forum.christitus.com/c/winutil-support/5");
  await expect(
    page.getByRole("link", { name: "Linux Utility support" }),
  ).toHaveAttribute("href", "https://forum.christitus.com/c/linux-utility/6");
});

test("known player states render and unknown ids redirect", async ({
  page,
  isMobile,
}) => {
  await page.setViewportSize(
    isMobile ? { width: 390, height: 844 } : { width: 900, height: 700 },
  );
  await page.goto("/live-streams/player/?v=wf9rLEjWmPE");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Taking a break",
  );
  await expect(
    page.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=wf9rLEjWmPE");
  await expect(page.locator("#chat-col")).toBeVisible();
  const player = page.locator("#player-wrapper");
  const media = player.locator(".media-embed");
  const chat = player.locator("#chat-col");
  const messages = player.locator("#chat-messages");
  await messages.evaluate((container) => {
    for (let index = 0; index < 100; index += 1) {
      const message = document.createElement("div");
      message.className = "chat-message";
      message.textContent = `Layout regression message ${index}`;
      container.append(message);
    }
  });
  expect(
    await messages.evaluate(
      (container) => container.scrollHeight > container.clientHeight,
    ),
  ).toBe(true);
  await expect(messages).toHaveCSS("overflow-y", "auto");
  await expect(messages).toHaveCSS("overscroll-behavior-y", "contain");
  if (!isMobile) {
    const geometry = await player.evaluate((wrapper) => {
      const mediaBox = wrapper
        .querySelector(".media-embed")!
        .getBoundingClientRect();
      const chatBox = wrapper
        .querySelector("#chat-col")!
        .getBoundingClientRect();
      return {
        mediaHeight: mediaBox.height,
        chatHeight: chatBox.height,
        sideBySide: chatBox.left >= mediaBox.right - 1,
      };
    });
    expect(geometry.sideBySide).toBe(true);
    expect(geometry.chatHeight).toBeCloseTo(geometry.mediaHeight, 0);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(media).toHaveCSS("position", "relative");
  const playerTop =
    (await page
      .locator(".site-header")
      .evaluate((element) => element.getBoundingClientRect().bottom)) + 8;
  await page.evaluate(
    ({ top }) => {
      const wrapper = document.querySelector("#player-wrapper")!;
      window.scrollTo(
        0,
        window.scrollY + wrapper.getBoundingClientRect().top - top,
      );
    },
    { top: playerTop },
  );
  await expect
    .poll(() =>
      player.evaluate((wrapper) => wrapper.getBoundingClientRect().bottom),
    )
    .toBeLessThanOrEqual(844);
  const geometry = await player.evaluate((wrapper) => {
    const mediaBox = wrapper
      .querySelector(".media-embed")!
      .getBoundingClientRect();
    const chatBox = wrapper.querySelector("#chat-col")!.getBoundingClientRect();
    return {
      mediaBottom: mediaBox.bottom,
      chatTop: chatBox.top,
      playerBottom: wrapper.getBoundingClientRect().bottom,
    };
  });
  expect(geometry.chatTop).toBeGreaterThanOrEqual(geometry.mediaBottom);
  expect(geometry.playerBottom).toBeLessThanOrEqual(844);
  await expect(media).toBeInViewport();
  await expect(chat).toBeInViewport();

  await page.setViewportSize({ width: 667, height: 320 });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const wrapper = document.querySelector("#player-wrapper")!;
    const headerBottom = document
      .querySelector(".site-header")!
      .getBoundingClientRect().bottom;
    window.scrollTo(
      0,
      window.scrollY + wrapper.getBoundingClientRect().top - headerBottom - 8,
    );
  });
  const landscapeGeometry = await player.evaluate((wrapper) => {
    const mediaBox = wrapper
      .querySelector(".media-embed")!
      .getBoundingClientRect();
    const chatBox = wrapper.querySelector("#chat-col")!.getBoundingClientRect();
    return {
      sideBySide: chatBox.left >= mediaBox.right - 1,
      mediaHeight: mediaBox.height,
      chatHeight: chatBox.height,
    };
  });
  expect(landscapeGeometry.sideBySide).toBe(true);
  expect(landscapeGeometry.chatHeight).toBeCloseTo(
    landscapeGeometry.mediaHeight,
    0,
  );
  await expect(media).toBeInViewport();
  await expect(chat).toBeInViewport();

  await page.setViewportSize({ width: 320, height: 256 });
  const narrowLandscapeGeometry = await player.evaluate((wrapper) => {
    const mediaBox = wrapper
      .querySelector(".media-embed")!
      .getBoundingClientRect();
    const chatBox = wrapper.querySelector("#chat-col")!.getBoundingClientRect();
    const messagesBox = wrapper
      .querySelector("#chat-messages")!
      .getBoundingClientRect();
    return {
      stacked: chatBox.top >= mediaBox.bottom - 1,
      chatWidth: chatBox.width,
      messagesHeight: messagesBox.height,
      documentWidth: document.documentElement.scrollWidth,
    };
  });
  expect(narrowLandscapeGeometry.stacked).toBe(true);
  expect(narrowLandscapeGeometry.chatWidth).toBeGreaterThan(290);
  expect(narrowLandscapeGeometry.messagesHeight).toBeGreaterThan(80);
  expect(narrowLandscapeGeometry.documentWidth).toBe(320);
  await page.goto("/live-streams/player/?v=hF3dAcTSivs");
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
    "Live Stream",
  );
  await expect(page.locator("#chat-col")).toBeHidden();
});

test("legacy redirects resolve", async ({ page }) => {
  await page.goto("/page/1/");
  await expect(page).toHaveURL("http://127.0.0.1:4321/");
  await page.goto("/live-streams/page/1/");
  await expect(page).toHaveURL("http://127.0.0.1:4321/live-streams/");
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
  const forums = page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Forums", exact: true });
  await expect(forums).toBeVisible();
  await expect(forums).toHaveAttribute("href", "https://forum.christitus.com/");
});

test("mobile navigation remains usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  await expect(
    page.getByRole("link", { name: "Newsletter", exact: true }),
  ).toBeVisible();
  await context.close();
});
