import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import path from "path"



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "maskable-icon.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});



// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
 
// })


