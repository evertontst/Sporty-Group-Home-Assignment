<script setup lang="ts">
import type { League } from '#shared/types/league'

const { leagues, pending, error } = useLeagues()
const filtersStore = useLeagueFiltersStore()

const filteredLeagues = computed(() => {
  return filtersStore.getFilteredLeagues(leagues.value || null)
})

// Modal state
const isModalOpen = shallowRef(false)
const selectedLeague = shallowRef<League | null>(null)
const openModal = (league: League) => {
  selectedLeague.value = league
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedLeague.value = null
  }, 300)
}
</script>

<template>
  <div class="flex flex-col space-y-6">
    <div v-if="pending" class="text-center text-gray-600">
      Loading leagues...
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      Error loading leagues: {{ error }}
    </div>

    <!-- Search and Filters -->
    <template v-else>
      <div class="grid gap-4 md:grid-cols-2">
        <LeagueSearchBar />
        <SportFilterDropdown :leagues="leagues || null" />
      </div>
      <div class="text-sm text-gray-600 py-4">
        Showing {{ filteredLeagues.length }} of {{ leagues?.length || 0 }} leagues
      </div>

      <SportsLeagueList :leagues="filteredLeagues" @league-click="openModal" />

      <LeagueModal
        :league="selectedLeague"
        :is-open="isModalOpen"
        @close="closeModal"
      />
    </template>
  </div>
</template>