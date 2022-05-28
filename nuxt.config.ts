import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
    ],
  },
  runtimeConfig: {
    marvelSecret: process.env.MARVEL_SECRET, // variable that can only be accessed on the server side
    public: {
      MARVEL_PUBLIC: process.env.MARVEL_PUBLIC || "https://nuxtjs.org", // variable that can also be accessed on the client side
    },
  },
});
