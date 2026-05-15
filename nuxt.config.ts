import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  ssr: false, // รันแบบ SPA

  app: {
    // 👇 ต้องตรงกับ path จริงของคุณใน server
    baseURL: "/49_modelchange/49_frontend_deploy/",
    buildAssetsDir: "_nuxt/", // โฟลเดอร์เก็บ assets
    cdnURL: "", // ต้องว่าง ถ้าใช้ภายใน server
    head: {
      title: "Model Change System",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "ระบบบันทึกการเปลี่ยนโมเดลในสายการผลิต",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "Model Change v3.png",
        },
      ],
    },
  },

  nitro: {
    preset: "static", // generate เป็น static file
  },

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    // Vuetify plugin
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
    plugins: [tailwindcss()],
    define: { "process.env.DEBUG": false },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_SESSION,
    },
  },
});
