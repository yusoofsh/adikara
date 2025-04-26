import { VitePWA } from "vite-plugin-pwa"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ generatedRouteTree: "./src/route-tree.gen.ts" }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        // Use context variables for better naming
        name: "adikara",
        short_name: "adikara",
        description: "adikara - PWA Application",
        theme_color: "#0c0c0c",
        // Add more manifest options as needed
      },
      pwaAssets: {
        disabled: false, // Set to false to enable asset generation
        config: true, // Use pwa-assets.config.ts
      },
      devOptions: {
        enabled: true, // Enable PWA features in dev mode
        resolveTempFolder: () => "./pwa", // Resolve temp folder for PWA assets
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
