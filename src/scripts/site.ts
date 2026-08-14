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
  .querySelectorAll<HTMLElement>(
    ".article-body :is(h2,h3)[id]:not([data-no-heading-link])",
  )
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
