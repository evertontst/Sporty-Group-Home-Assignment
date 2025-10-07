<script setup lang="ts">
import type { League } from '#shared/types/league'
defineProps<{
  leagues: League[] | null
}>()

const emit = defineEmits<{
  'league-click': [league: League]
}>()

const handleLeagueClick = (league: League) => {
  emit('league-click', league)
}
</script>

<template>
  <div>
    <div v-if="!leagues || leagues.length === 0" class="text-center text-gray-600">
      No leagues found.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SportsLeagueCard
        v-for="league in leagues"
        :key="league.idLeague"
        :league="league"
        @click="handleLeagueClick"
      />
    </div>
  </div>
</template>