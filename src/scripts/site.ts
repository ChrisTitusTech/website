import checkIcon from "../icons/check.svg?raw";
import errorIcon from "../icons/error.svg?raw";
import arrowRightIcon from "../icons/arrow-right.svg?raw";

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

const searchToggles = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-search-toggle]"),
];
const searchPanel = document.querySelector<HTMLElement>("[data-search-panel]");
const searchForm =
  document.querySelector<HTMLFormElement>("[data-search-form]");
const searchInput = document.querySelector<HTMLInputElement>("#search-query");
const searchExtra = document.querySelector<HTMLElement>("[data-search-extra]");
const searchStatus = document.querySelector<HTMLElement>(
  "[data-search-status]",
);
const searchResults = document.querySelector<HTMLElement>(
  "[data-search-results]",
);
const communitySearch = document.querySelector<HTMLAnchorElement>(
  "[data-community-search]",
);
if (searchToggles.length && searchPanel && searchForm && searchInput) {
  let searchIndex:
    | Array<{
        title: string;
        tags: string[];
        categories: string[];
        contents: string;
        permalink: string;
      }>
    | undefined;
  let searchGeneration = 0;

  const updateCommunitySearch = (query: string) => {
    if (!communitySearch) return;
    communitySearch.href = query
      ? `https://forum.christitus.com/search?q=${encodeURIComponent(query)}`
      : "https://forum.christitus.com/search";
    communitySearch.textContent = query
      ? `Search the community for “${query}”`
      : "Search the community forums";
  };

  const runSearch = async (query: string) => {
    if (!searchStatus || !searchResults) return;
    const generation = ++searchGeneration;
    searchStatus.textContent = "Loading search index...";
    try {
      searchIndex ??= await fetch("/index.json").then((response) => {
        if (!response.ok) throw new Error("Search index failed to load");
        return response.json();
      });
      if (generation !== searchGeneration) return;
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const index = searchIndex ?? [];
      const matches = index
        .filter((item) => {
          const value = [
            item.title,
            item.contents,
            ...item.tags,
            ...item.categories,
          ]
            .join(" ")
            .toLowerCase();
          return terms.every((term) => value.includes(term));
        })
        .slice(0, 50);
      searchStatus.textContent = matches.length
        ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
        : "No results found.";
      searchResults.replaceChildren(
        ...matches.map((item) => {
          const link = document.createElement("a");
          link.className = "search-result";
          link.dataset.searchResult = "";
          link.href = item.permalink;
          const title = document.createElement("span");
          title.className = "search-result-title";
          title.textContent = item.title;
          const arrow = document.createElement("span");
          arrow.className = "search-result-arrow";
          arrow.innerHTML = arrowRightIcon;
          link.append(title, arrow);
          return link;
        }),
      );
    } catch (error) {
      if (generation === searchGeneration)
        searchStatus.textContent =
          error instanceof Error ? error.message : "Search failed.";
    }
  };

  const setTogglesExpanded = (expanded: boolean) => {
    for (const toggle of searchToggles)
      toggle.setAttribute("aria-expanded", String(expanded));
  };
  const openSearch = () => {
    setTogglesExpanded(true);
    searchPanel.hidden = false;
    searchInput.value = "";
    if (searchExtra) searchExtra.hidden = true;
    searchResults?.replaceChildren();
    if (searchStatus) searchStatus.textContent = "Enter a search term.";
    updateCommunitySearch("");
    searchInput.focus();
  };
  const closeSearch = () => {
    setTogglesExpanded(false);
    searchPanel.hidden = true;
    const active = searchToggles.find((toggle) => toggle.offsetParent !== null);
    active?.focus();
  };

  for (const toggle of searchToggles) {
    toggle.addEventListener("click", () => {
      if (searchPanel.hidden) openSearch();
      else closeSearch();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !searchPanel.hidden) closeSearch();
  });
  searchPanel.addEventListener("click", (event) => {
    if (event.target === searchPanel) closeSearch();
  });

  let searchDebounce: ReturnType<typeof setTimeout> | undefined;
  updateCommunitySearch(searchInput.value.trim());
  searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    const query = searchInput.value.trim();
    updateCommunitySearch(query);
    if (searchExtra) searchExtra.hidden = !query;
    if (!query) {
      searchGeneration += 1;
      searchResults?.replaceChildren();
      if (searchStatus) searchStatus.textContent = "Enter a search term.";
      return;
    }
    searchDebounce = setTimeout(() => void runSearch(query), 200);
  });
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(searchDebounce);
    const query = searchInput.value.trim();
    if (query) void runSearch(query);
  });
}

document.querySelectorAll<HTMLElement>("[data-open-search]").forEach((el) => {
  el.addEventListener("click", () => {
    searchToggles[0]?.dispatchEvent(new MouseEvent("click"));
  });
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

const copyButton =
  document.querySelector<HTMLButtonElement>("[data-copy-page]");
if (copyButton) {
  const defaultLabel = copyButton.getAttribute("aria-label") ?? "Copy link";
  const defaultIcon = copyButton.innerHTML;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyButton.innerHTML = checkIcon;
      copyButton.setAttribute("aria-label", "Link copied");
    } catch {
      copyButton.innerHTML = errorIcon;
      copyButton.setAttribute("aria-label", "Copy failed");
    }
    setTimeout(() => {
      copyButton.innerHTML = defaultIcon;
      copyButton.setAttribute("aria-label", defaultLabel);
    }, 1600);
  });
}

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

const backToTop =
  document.querySelector<HTMLButtonElement>("[data-back-to-top]");
if (backToTop) {
  const syncVisibility = () => {
    backToTop.hidden = scrollY < 600;
  };
  addEventListener("scroll", syncVisibility, { passive: true });
  syncVisibility();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  backToTop.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  });
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
