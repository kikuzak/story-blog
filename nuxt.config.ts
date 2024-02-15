// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['nuxt-gtag'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "ja"
      },
      meta: [
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'MARINTO GOA (マリントゴア)'},
        {property: 'og:type', content: 'article'},
        {property: 'og:image', content: 'https://marintogoa.net/ogp.png'},
        
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
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
  gtag: {
    id: 'G-K4GW1V0ZRM'
  },
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
