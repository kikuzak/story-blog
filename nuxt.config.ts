// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "ja"
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        }
      ]
    }
  },
  css: [
    "@/assets/css/reset.css",
    "@/assets/css/k-framework.scss",
    "@/assets/css/article.scss"
  ],
  modules: [ '@nuxt/image'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";'
        }
      }
    }
  }
})
