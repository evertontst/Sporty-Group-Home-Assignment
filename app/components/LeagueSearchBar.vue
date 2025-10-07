<script setup lang="ts">
const filtersStore = useLeagueFiltersStore()
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  filtersStore.setSearchQuery(target.value)
}
</script>

<template>
  <div class="w-full">
    <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
      Search Leagues
    </label>
    <input
      id="search"
      type="text"
      :value="filtersStore.searchQuery"
      placeholder="Search by league name..."
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all"
      @input="handleSearch"
    >
  </div>
</template>