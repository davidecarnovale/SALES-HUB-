import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  server: {
    port: Number(process.env.PORT || 3000),
    // Shopify's tunnel serves the app from a *.trycloudflare.com host;
    // Vite must accept requests coming in on that host, not just localhost.
    allowedHosts: true,
  },
});
