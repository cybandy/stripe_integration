// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      // script: [
      //   { src: 'https://js.stripe.com/v3', crossorigin: 'anonymous' }
      // ]
    }
  },
  modules: [
    // '@unlok-co/nuxt-stripe'
  ],
  // stripe:{
  //   client:{
  //     key: process.env.STRIPE_API_PK
  //   }
  // },
})
