import { defineConfig } from "astro/config";

// Static output. The signup function stays in /api and runs on Vercel beside it.
export default defineConfig({
  site: "https://thehanukkahfairy.com",
  publicDir: "static",
  outDir: "dist",
  trailingSlash: "never",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
