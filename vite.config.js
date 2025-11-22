import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// IMPORTANT: Change this to match your GitHub repository name
// If your repo is "my-app", change to "/my-app/"
// If deploying to root domain (username.github.io), use "/"
const REPO_NAME = "Invoice-Generator";
const base = `/${REPO_NAME}/`;

export default defineConfig({
  base: base, // IMPORTANT for GitHub Pages - must match repository name

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "PDF Generator - Invoice Creator",
        short_name: "PDF Gen",
        description:
          "Generate professional PDF invoices with client and item details",
        theme_color: "#667eea",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: base,
        scope: base,
        icons: [
          {
            src: `${base}logo.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${base}logo.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
