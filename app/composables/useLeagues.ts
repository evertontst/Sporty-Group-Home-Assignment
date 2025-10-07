import type { League, LeaguesResponse } from '#shared/types/league'

export const useLeagues = () => {
  const config = useRuntimeConfig()

  const { data: leagues, pending, error, refresh } = useFetch(
    config.public.allLeaguesApi,
    {
      key: 'all-leagues',
      transform: (data: LeaguesResponse): League[] => data.leagues || [],
      // Cache for the entire session - reuse cached data when available
      getCachedData: (key) => useNuxtData(key).data.value
    }
  )

  return {
    leagues,
    pending,
    error,
    refresh
  }
}