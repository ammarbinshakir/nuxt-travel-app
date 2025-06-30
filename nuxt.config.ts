export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000",
    },
  },
  app: {
    head: {
      title: "Travel Experiences",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Discover amazing travel experiences" },
      ],
    },
  },
  nitro: {
    compatibilityDate: "2025-06-29",
  },
});
