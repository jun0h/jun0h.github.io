export default defineNuxtConfig({
  devtools: { enabled: true },
  
  css: ['/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  image: {
    dir: 'assets'
  },
  app: {
    baseURL: '/jun0h.github.io/' 
  },
})