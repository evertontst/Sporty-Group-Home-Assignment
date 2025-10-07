<script setup lang="ts">
const { leagues, pending, error } = useLeagues()
const filtersStore = useLeagueFiltersStore()

const filteredLeagues = computed(() => {
  return filtersStore.getFilteredLeagues(leagues.value || null)
})
</script>

<template>
  <div>
    <div v-if="pending" class="text-center text-gray-600">
      Loading leagues...
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      Error loading leagues: {{ error }}
    </div>

    <SportsLeagueList v-else :leagues="filteredLeagues" />
  </div>
</template>