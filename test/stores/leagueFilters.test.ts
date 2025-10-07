import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLeagueFiltersStore } from '../../app/stores/leagueFilters'
import type { League } from '#shared/types/league'

describe('leagueFilters store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockLeagues: League[] = [
    {
      idLeague: '1',
      strLeague: 'Premier League',
      strSport: 'Soccer',
      strLeagueAlternate: 'EPL'
    },
    {
      idLeague: '2',
      strLeague: 'NBA',
      strSport: 'Basketball',
      strLeagueAlternate: 'National Basketball Association'
    },
    {
      idLeague: '3',
      strLeague: 'La Liga',
      strSport: 'Soccer',
      strLeagueAlternate: null
    }
  ]

  describe('initial state', () => {
    it('should have empty search query', () => {
      const store = useLeagueFiltersStore()
      expect(store.searchQuery).toBe('')
    })

    it('should have "all" as selected sport', () => {
      const store = useLeagueFiltersStore()
      expect(store.selectedSport).toBe('all')
    })

    it('should have null as selected league ID', () => {
      const store = useLeagueFiltersStore()
      expect(store.selectedLeagueId).toBeNull()
    })
  })

  describe('setSearchQuery', () => {
    it('should update search query', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('Premier')
      expect(store.searchQuery).toBe('Premier')
    })
  })

  describe('setSelectedSport', () => {
    it('should update selected sport', () => {
      const store = useLeagueFiltersStore()
      store.setSelectedSport('Soccer')
      expect(store.selectedSport).toBe('Soccer')
    })
  })

  describe('setSelectedLeagueId', () => {
    it('should update selected league ID', () => {
      const store = useLeagueFiltersStore()
      store.setSelectedLeagueId('123')
      expect(store.selectedLeagueId).toBe('123')
    })

    it('should handle null league ID', () => {
      const store = useLeagueFiltersStore()
      store.setSelectedLeagueId('123')
      store.setSelectedLeagueId(null)
      expect(store.selectedLeagueId).toBeNull()
    })
  })

  describe('resetFilters', () => {
    it('should reset all filters to initial state', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('test')
      store.setSelectedSport('Soccer')
      store.setSelectedLeagueId('123')

      store.resetFilters()

      expect(store.searchQuery).toBe('')
      expect(store.selectedSport).toBe('all')
      expect(store.selectedLeagueId).toBeNull()
    })
  })

  describe('getFilteredLeagues', () => {
    it('should return empty array when leagues is null', () => {
      const store = useLeagueFiltersStore()
      const result = store.getFilteredLeagues(null)
      expect(result).toEqual([])
    })

    it('should return all leagues when no filters applied', () => {
      const store = useLeagueFiltersStore()
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toEqual(mockLeagues)
    })

    it('should filter by search query (league name)', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('Premier')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toHaveLength(1)
      expect(result[0].strLeague).toBe('Premier League')
    })

    it('should filter by search query (alternate name)', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('EPL')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toHaveLength(1)
      expect(result[0].strLeague).toBe('Premier League')
    })

    it('should filter by search query case-insensitively', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('nba')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toHaveLength(1)
      expect(result[0].strLeague).toBe('NBA')
    })

    it('should filter by sport', () => {
      const store = useLeagueFiltersStore()
      store.setSelectedSport('Soccer')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toHaveLength(2)
      expect(result.every(league => league.strSport === 'Soccer')).toBe(true)
    })

    it('should not filter when sport is "all"', () => {
      const store = useLeagueFiltersStore()
      store.setSelectedSport('all')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toEqual(mockLeagues)
    })

    it('should apply both search and sport filters', () => {
      const store = useLeagueFiltersStore()
      store.setSearchQuery('league')
      store.setSelectedSport('Soccer')
      const result = store.getFilteredLeagues(mockLeagues)
      expect(result).toHaveLength(1)
      expect(result[0].strLeague).toBe('Premier League')
    })
  })

  describe('getUniqueSports', () => {
    it('should return empty array when leagues is null', () => {
      const store = useLeagueFiltersStore()
      const result = store.getUniqueSports(null)
      expect(result).toEqual([])
    })

    it('should return unique sports sorted alphabetically', () => {
      const store = useLeagueFiltersStore()
      const result = store.getUniqueSports(mockLeagues)
      expect(result).toEqual(['Basketball', 'Soccer'])
    })

    it('should handle duplicate sports', () => {
      const store = useLeagueFiltersStore()
      const leaguesWithDuplicates = [
        ...mockLeagues,
        {
          idLeague: '4',
          strLeague: 'Bundesliga',
          strSport: 'Soccer',
          strLeagueAlternate: null
        }
      ]
      const result = store.getUniqueSports(leaguesWithDuplicates)
      expect(result).toEqual(['Basketball', 'Soccer'])
    })
  })
})