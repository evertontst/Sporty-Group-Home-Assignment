<script setup lang="ts">
import type { League } from '#shared/types/league'
defineProps<{
  league: League
}>()

const emit = defineEmits<{
  click: [league: League]
}>()

const handleClick = (league: League) => {
  emit('click', league)
}
</script>

<template>
  <div
    class="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white hover:border-red"
    role="button"
    tabindex="0"
    @click="handleClick(league)"
  >
    <h2 class="text-xl font-semibold text-gray-900 mb-2">
      {{ league.strLeague }}
    </h2>

    <p class="text-gray-600 mb-1">
      <span class="font-medium">Sport:</span> {{ league.strSport }}
    </p>

    <p v-if="league.strLeagueAlternate" class="text-gray-500 text-sm">
      <span class="font-medium">Alternative:</span> {{ league.strLeagueAlternate }}
    </p>
    
    <p class="text-xs text-gray-400 mt-3 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      Click to view badge
    </p>
  </div>
</template>