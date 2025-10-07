import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  image: {
    domains: ['r2.thesportsdb.com'],
    provider: 'ipx',
    ipx: {
      maxAge: 60 * 60 * 24 * 30, // Cache for 30 days
    }
  },

  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    public: {
      allLeaguesApi: process.env.NUXT_PUBLIC_ALL_LEAGUES_API || 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php',
      badgeLookupApi: process.env.NUXT_PUBLIC_BADGE_LOOKUP_API || 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php'
    }
  }
})