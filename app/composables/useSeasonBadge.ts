import type { Season, SeasonsResponse } from '#shared/types/league'

export const useSeasonBadge = async (leagueId: string) => {
  const config = useRuntimeConfig()
  const key = `badge-${leagueId}`

  // Check if already cached
  const cachedData = useNuxtData(key)
  if (cachedData.data.value) {
    return cachedData.data.value
  }

  // Fetch using $fetch
  const data = await $fetch<SeasonsResponse>(
    `${config.public.badgeLookupApi}?badge=1&id=${leagueId}`
  )

  // Transform data
  const seasons = Array.isArray(data.seasons) ? data.seasons : []
  const seasonsWithBadges = seasons.filter(season => season.strBadge)

  if (seasonsWithBadges.length === 0) {
    return null
  }

  // Sort by season to get the latest one
  const latestSeason = seasonsWithBadges.sort((a, b) => {
    const getLatestYear = (seasonStr: string) => {
      const years = seasonStr.match(/\d{4}/g)
      if (!years) return 0
      return Math.max(...years.map(y => parseInt(y)))
    }

    const yearA = getLatestYear(a.strSeason || '')
    const yearB = getLatestYear(b.strSeason || '')

    return yearB - yearA
  })[0]

  const result = latestSeason ?? null

  // Cache the result
  useNuxtData(key).data.value = result

  return result
}