const root = document.documentElement;

function syncThemeControl() {
  const light = root.dataset.theme === "light";
  const toggle = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]",
  );
  toggle?.setAttribute(
    "aria-label",
    `Switch to ${light ? "dark" : "light"} theme`,
  );
  const icon = toggle?.querySelector<HTMLElement>("[data-theme-icon]");
  if (icon) icon.textContent = light ? "☾" : "☀";
  document
    .querySelector<HTMLIFrameElement>("iframe.utterances-frame")
    ?.contentWindow?.postMessage(
      { type: "set-theme", theme: light ? "github-light" : "github-dark" },
      "https://utteranc.es",
    );
}

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", root.dataset.theme);
  syncThemeControl();
});
syncThemeControl();

document
  .querySelectorAll<HTMLImageElement>("img[data-cf-image]")
  .forEach((image) => {
    const useDirectSource = () => {
      if (!image.srcset) return;
      image.srcset = "";
      image.removeAttribute("sizes");
      image.src = image.src;
    };
    image.addEventListener("error", useDirectSource, { once: true });
    if (image.complete && image.naturalWidth === 0) useDirectSource();
  });

const menuButton =
  document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menu?.toggleAttribute("data-open", open);
});

const responsiveToc = document.querySelector<HTMLDetailsElement>(
  "[data-responsive-toc]",
);
const tocMedia = matchMedia("(max-width: 940px)");
const syncResponsiveToc = (mobile: boolean) =>
  responsiveToc?.toggleAttribute("open", !mobile);
syncResponsiveToc(tocMedia.matches);
tocMedia.addEventListener("change", (event) =>
  syncResponsiveToc(event.matches),
);

const progress = document.querySelector<HTMLElement>("[data-reading-progress]");
if (progress) {
  const update = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty(
      "--reading-progress",
      `${range > 0 ? Math.min(100, (scrollY / range) * 100) : 0}%`,
    );
  };
  addEventListener("scroll", update, { passive: true });
  update();
}

document.querySelectorAll<HTMLElement>(".article-body pre").forEach((pre) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        pre.querySelector("code")?.textContent ?? pre.textContent ?? "",
      );
      button.textContent = "Copied";
    } catch {
      button.textContent = "Copy failed";
    }
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1600);
  });
  pre.append(button);
});

document
  .querySelectorAll<HTMLElement>(".article-body :is(h2,h3)[id]")
  .forEach((heading) => {
    heading.classList.add("linked-heading");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.className = "heading-link";
    link.setAttribute(
      "aria-label",
      `Link to ${heading.textContent ?? "section"}`,
    );
    link.textContent = "#";
    heading.prepend(link);
  });

document
  .querySelector<HTMLButtonElement>("[data-copy-page]")
  ?.addEventListener("click", async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    try {
      await navigator.clipboard.writeText(location.href);
      button.textContent = "Link copied";
    } catch {
      button.textContent = "Copy failed";
    }
  });

const tocLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-toc] a"),
];
if (tocLinks.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          tocLinks.forEach((link) =>
            link.toggleAttribute(
              "aria-current",
              link.hash === `#${entry.target.id}`,
            ),
          );
        }
    },
    { rootMargin: "-15% 0px -70%" },
  );
  tocLinks.forEach((link) => {
    const target = document.getElementById(
      decodeURIComponent(link.hash.slice(1)),
    );
    if (target) observer.observe(target);
  });
}

function loadUtterances() {
  const host = document.querySelector<HTMLElement>("[data-comments]");
  if (!host || host.dataset.loaded) return;
  host.dataset.loaded = "true";
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("repo", "ChrisTitusTech/website");
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("label", "comments");
  script.setAttribute(
    "theme",
    root.dataset.theme === "light" ? "github-light" : "github-dark",
  );
  script.addEventListener(
    "error",
    () => {
      const fallback = document.createElement("p");
      fallback.className = "notice";
      fallback.append("Comments are unavailable. ");
      const link = document.createElement("a");
      link.href = "https://github.com/ChrisTitusTech/website/issues";
      link.textContent = "Continue the discussion on GitHub.";
      fallback.append(link);
      host.replaceChildren(fallback);
    },
    { once: true },
  );
  host.replaceChildren(script);
}

const comments = document.querySelector<HTMLElement>("[data-comments]");
if (comments && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadUtterances();
        observer.disconnect();
      }
    },
    { rootMargin: "500px" },
  );
  observer.observe(comments);
}

function loadAds() {
  if (
    !document.querySelector("[data-ad-slot]") ||
    document.querySelector("script[data-google-ads]")
  )
    return;
  const script = document.createElement("script");
  script.async = true;
  script.dataset.googleAds = "true";
  script.crossOrigin = "anonymous";
  script.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6679678361432308";
  script.addEventListener(
    "load",
    () => {
      document.querySelectorAll<HTMLElement>(".adsbygoogle").forEach((slot) => {
        if (slot.dataset.adsbygoogleStatus) return;
        ((window as any).adsbygoogle ??= []).push({});
      });
    },
    { once: true },
  );
  document.head.append(script);
}
addEventListener("scroll", loadAds, { once: true, passive: true });
addEventListener("pointerdown", loadAds, { once: true, passive: true });

document
  .querySelector<HTMLButtonElement>("[data-shopify-load]")
  ?.addEventListener("click", async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const host = button.closest<HTMLElement>("[data-shopify-products]");
    if (!host) return;
    button.disabled = true;
    button.textContent = "Loading store...";
    const script = document.createElement("script");
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.addEventListener(
      "load",
      async () => {
        try {
          const ShopifyBuy = (window as any).ShopifyBuy;
          const client = ShopifyBuy.buildClient({
            domain: "1efdc2-1a.myshopify.com",
            storefrontAccessToken: "d3832fa1046e2ebd19d3bfd837bf5eb3",
          });
          const ui = await ShopifyBuy.UI.onReady(client);
          const mount = document.createElement("div");
          mount.hidden = true;
          host.append(mount);
          await ui.createComponent("product", {
            id: "9430583542065",
            node: mount,
            moneyFormat: "%24%7B%7Bamount%7D%7D",
            options: {
              product: {
                buttonDestination: "checkout",
                layout: "horizontal",
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  description: true,
                },
                width: "100%",
                text: { button: "Buy now" },
                styles: {
                  product: { "max-width": "100%", "text-align": "left" },
                  button: {
                    "background-color": "#347eaa",
                    "font-weight": "bold",
                    ":hover": { "background-color": "#28688e" },
                  },
                },
              },
            },
          });
          host.replaceChildren(mount);
          mount.hidden = false;
        } catch {
          host.querySelector(":scope > div[hidden]")?.remove();
          button.disabled = false;
          button.textContent = "Store unavailable - try again";
        }
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        button.disabled = false;
        button.textContent = "Store unavailable - try again";
      },
      { once: true },
    );
    document.head.append(script);
  });
