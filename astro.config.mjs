import { defineConfig } from "astro/config";

// Static output. The signup function stays in /api and runs on Vercel beside it.
// HF_BASE=/v2 builds the approval preview that lives under a path on the live domain.
const base = process.env.HF_BASE || "/";
export default defineConfig({
  site: "https://thehanukkahfairy.com",
  base,
  outDir: base === "/" ? "dist" : "dist-v2",
  publicDir: "static",
  trailingSlash: "never",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
