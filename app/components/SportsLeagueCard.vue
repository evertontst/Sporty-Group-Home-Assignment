<script setup lang="ts">
import type { League } from '#shared/types/league'
defineProps<{
  league: League
}>()
</script>

<template>
  <div class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
    <h2 class="text-xl font-semibold text-gray-900 mb-2">
      {{ league.strLeague }}
    </h2>

    <p class="text-gray-600 mb-1">
      <span class="font-medium">Sport:</span> {{ league.strSport }}
    </p>

    <p v-if="league.strLeagueAlternate" class="text-gray-500 text-sm">
      <span class="font-medium">Alternative:</span> {{ league.strLeagueAlternate }}
    </p>
  </div>
</template>