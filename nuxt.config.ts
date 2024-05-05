// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
