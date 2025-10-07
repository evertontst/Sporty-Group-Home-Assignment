import type { SeasonsResponse } from '#shared/types/league'

export const useSeasonBadge = (leagueId: Ref<string | null>) => {
    const config = useRuntimeConfig()

    const { data: badge, pending, error } = useFetch(
        () => `${config.public.badgeLookupApi}?badge=1&id=${leagueId.value}`,
        {
            key: computed(() => `badge-${leagueId.value}`),
            immediate: false,
            watch: [leagueId],
            // Only fetch if leagueId exists
            transform: (data: SeasonsResponse): string | null => {
                // Get the first season with a badge
                const seasonWithBadge = data.seasons?.find(season => season.strBadge)
                return seasonWithBadge?.strBadge || null
            },
            getCachedData: (key) => useNuxtData(key).data.value
        }
    )

    return {
        badge,
        pending,
        error
    }
}