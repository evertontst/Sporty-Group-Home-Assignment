
import { defineStore } from 'pinia'
import type { League } from '#shared/types/league'

export const useLeagueFiltersStore = defineStore('leagueFilters', () => {
  const searchQuery = shallowRef('')
  const selectedSport = shallowRef<string>('all')
  const selectedLeagueId = shallowRef<string | null>(null)

  const getFilteredLeagues = (leagues: League[] | null) => {
    if (!leagues) return []

    let filtered = leagues

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(league =>
        league.strLeague.toLowerCase().includes(query) ||
        league.strLeagueAlternate?.toLowerCase().includes(query)
      )
    }

    if (selectedSport.value && selectedSport.value !== 'all') {
      filtered = filtered.filter(league => league.strSport === selectedSport.value)
    }

    return filtered
  }

  const getUniqueSports = (leagues: League[] | null) => {
    if (!leagues) return []
    const sports = new Set(leagues.map(league => league.strSport))
    return Array.from(sports).sort()
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setSelectedSport = (sport: string) => {
    selectedSport.value = sport
  }

  const setSelectedLeagueId = (leagueId: string | null) => {
    selectedLeagueId.value = leagueId
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedSport.value = 'all'
    selectedLeagueId.value = null
  }

  return {
    // State
    searchQuery,
    selectedSport,
    selectedLeagueId,

    // Actions
    setSearchQuery,
    setSelectedSport,
    setSelectedLeagueId,
    resetFilters,

    // Computed helpers
    getFilteredLeagues,
    getUniqueSports
  }
})