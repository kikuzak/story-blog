// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
  image: {
    dir: 'static/img/',
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    }
  },
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
