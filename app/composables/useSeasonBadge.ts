import type { Season, SeasonsResponse } from '#shared/types/league'

export const useSeasonBadge = (leagueId: Ref<string | null>) => {
    const config = useRuntimeConfig()

    const { data: season, pending, error, execute, clear, refresh } = useFetch(
        () => `${config.public.badgeLookupApi}?badge=1&id=${leagueId.value}`,
        {
            key: computed(() => `badge-${leagueId.value}`),
            immediate: false,
            watch: false,
            transform: (data: SeasonsResponse): Season | null => {

                const seasonsWithBadges = data.seasons?.filter(season => season.strBadge) || []

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

                return latestSeason ?? null
            },
            getCachedData: (key) => useNuxtData(key).data.value
        }
    )

    return {
        error,
        pending,
        season,
        clear,
        execute,
        refresh
    }
}