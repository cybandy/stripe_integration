// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unlok-co/nuxt-stripe'
  ],
  stripe:{
    client:{
      key: process.env.STRIPE_API_PK
    }
  },
})
