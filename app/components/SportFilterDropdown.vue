<script setup lang="ts">
import type { League } from '#shared/types/league'
const props = defineProps<{
  leagues: League[] | null
}>()
const filtersStore = useLeagueFiltersStore()
const uniqueSports = computed(() => {
  if (!props.leagues) return []
  return filtersStore.getUniqueSports(props.leagues)
})
const handleSportChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  filtersStore.setSelectedSport(target.value)
}
</script>

<template>
  <div class="w-full">
    <label for="sport-filter" class="block text-sm font-medium text-gray-700 mb-2">
      Filter by Sport
    </label>
    <select
      id="sport-filter"
      :value="filtersStore.selectedSport"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all bg-white cursor-pointer"
      @change="handleSportChange"
    >
      <option value="all">All Sports</option>
      <option v-for="sport in uniqueSports" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>
  </div>
</template>