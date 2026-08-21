import { readFile } from "node:fs/promises";
import vm from "node:vm";

import { describe, expect, it } from "vitest";

const root = new URL("../../", import.meta.url);

async function runCopyScript({ commandSupported, copyResult = true }) {
  const source = await readFile(
    new URL("public/js/code-copy.js", root),
    "utf8",
  );
  const selection = {
    removeCount: 0,
    addRange() {},
    removeAllRanges() {
      this.removeCount += 1;
    },
  };
  const container = {
    firstElementChild: {},
    appendChild(button) {
      this.button = button;
    },
  };
  const document = {
    createElement() {
      return {
        addEventListener(_event, listener) {
          this.listener = listener;
        },
      };
    },
    createRange() {
      return { selectNodeContents() {} };
    },
    execCommand() {
      return copyResult;
    },
    getElementsByClassName() {
      return [container];
    },
  };
  if (commandSupported !== undefined) {
    document.queryCommandSupported = () => commandSupported;
  }
  const timers = new Map();
  let nextTimer = 1;
  vm.runInNewContext(source, {
    clearTimeout(timer) {
      timers.delete(timer);
    },
    console: { log() {} },
    document,
    setTimeout(callback) {
      const timer = nextTimer;
      nextTimer += 1;
      timers.set(timer, callback);
      return timer;
    },
    window: { getSelection: () => selection },
  });
  return { container, selection, timers };
}

describe("legacy static compatibility", () => {
  it("does not initialize copy buttons without command support", async () => {
    const { container } = await runCopyScript({ commandSupported: undefined });
    expect(container.button).toBeUndefined();
  });

  it("reports a failed copy command and always clears the selection", async () => {
    const { container, selection } = await runCopyScript({
      commandSupported: true,
      copyResult: false,
    });

    container.button.listener();

    expect(container.button.textContent).toBe("Failed :'(");
    expect(selection.removeCount).toBe(2);
  });

  it("keeps only the latest copy-status reset timer", async () => {
    const { container, timers } = await runCopyScript({
      commandSupported: true,
    });

    container.button.listener();
    container.button.listener();

    expect(container.button.textContent).toBe("Copied!");
    expect(timers.size).toBe(1);
    timers.values().next().value();
    expect(container.button.textContent).toBe("Copy");
  });

  it("limits legacy smooth scrolling to users without reduced motion", async () => {
    const css = await readFile(
      new URL("public/css/custom-nav.css", root),
      "utf8",
    );
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)[\s\S]*scroll-behavior: smooth/,
    );
  });
});
