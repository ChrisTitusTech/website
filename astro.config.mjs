import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://christitus.com",
  output: "static",
  outDir: "./dist",
  publicDir: "./static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  redirects: {
    "/videos/": {
      status: 301,
      destination: "https://youtube.com/@christitustech",
    },
  },
});
