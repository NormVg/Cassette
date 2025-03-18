// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },


  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },

  app: {
    head: {
      title: 'Cassette Music - Decentralized Streaming',
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],

      meta: [
        { name: 'description', content: 'Cassette Music, built by TheAlphaOnes and Vishnu Gupta (TheNormVg), is a decentralized music streaming platform powered by Connect Box. Listen to your music anywhere with secure cloud storage.' },
        { name: 'keywords', content: 'Cassette Music, decentralized streaming, web3 music, blockchain audio, NFT music, Connect Box, TheAlphaOnes, Vishnu Gupta, TheNormVg' },
        { name: 'author', content: 'Vishnu Gupta (TheNormVg), TheAlphaOnes' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph (OG)
        { property: 'og:title', content: 'Cassette Music - Decentralized Streaming' },
        { property: 'og:description', content: 'Cassette Music, developed by TheAlphaOnes and Vishnu Gupta (TheNormVg), is a decentralized music platform powered by Connect Box for secure, global streaming.' },
        { property: 'og:image', content: 'https://cassette.thealphaones.com/og-img.png' },
        { property: 'og:url', content: 'https://cassette.thealphaones.com' },
        { property: 'og:type', content: 'website' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Cassette Music - Decentralized Streaming' },
        { name: 'twitter:description', content: 'Built by TheAlphaOnes and Vishnu Gupta (TheNormVg), Cassette Music lets you stream your music anywhere with decentralized cloud storage.' },
        { name: 'twitter:image', content: 'https://cassette.thealphaones.com/og-img.png' },
        { name: 'twitter:site', content: '@TheNormVg' },
      ],
    },
  },

  modules: ["@nuxtjs/device", "nuxt-mongoose", "@pinia/nuxt"],
})
