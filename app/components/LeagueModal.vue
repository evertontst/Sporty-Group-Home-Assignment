<script setup lang="ts">
import type { League } from '#shared/types/league'

const props = defineProps<{
  league: League | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

// Get the season data directly from Nuxt cache based on current league
const currentSeason = computed(() => {
  if (!props.league?.idLeague) return null
  const cachedData = useNuxtData(`badge-${props.league.idLeague}`)
  return cachedData.data.value
})

const isLoading = shallowRef <boolean>(false)
const fetchError = shallowRef<Error | null>(null)

// Fetch data for the current league if not cached
const fetchSeasonData = async (leagueId: string) => {
  const cachedData = useNuxtData(`badge-${leagueId}`)

  // If already cached, no need to fetch
  if (cachedData.data.value) {
    return
  }

  isLoading.value = true
  fetchError.value = null

  try {
    await useSeasonBadge(leagueId)
  } catch (err) {
    fetchError.value = err as Error
  } finally {
    isLoading.value = false
  }
}

// Watch for modal open and league changes
watch(
  () => ({ id: props.league?.idLeague, isOpen: props.isOpen }),
  async ({ id, isOpen }) => {
    if (isOpen && id) {
      await fetchSeasonData(id)
    }
  },
  { immediate: true }
)

const imageLoading = shallowRef(false)
const showLoader = shallowRef(false)

watch(() => currentSeason.value?.strBadge, () => {
  imageLoading.value = true

  if (imageLoading.value) {
    showLoader.value = true
  }
})

const handleImageLoad = () => {
  imageLoading.value = false
  showLoader.value = false
}

const handleImageError = () => {
  imageLoading.value = false
  showLoader.value = false
}

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

// Handle Escape key to close modal using VueUse
onKeyStroke('Escape', () => {
  if (props.isOpen) {
    handleClose()
  }
})

// Prevent background scrolling
if (import.meta.client) {
  const isLocked = useScrollLock(document.body)
  watch(() => props.isOpen, (isOpen) => {
    isLocked.value = isOpen
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && league"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        @click="handleBackdropClick"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-start justify-between p-6 border-b">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ league.strLeague }}
            </h2>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
              @click="handleClose"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red" />
              <p class="mt-4 text-gray-600">Loading season badge...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="fetchError" class="text-center py-8">
              <svg class="w-16 h-16 text-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-red font-semibold">Failed to load season badge</p>
              <p class="text-gray-600 text-sm mt-2">{{ fetchError.message || fetchError }}</p>
            </div>

            <!-- No Badge Found -->
            <div v-else-if="!currentSeason || !currentSeason.strBadge" class="text-center py-8">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-600">No season badge available for this league</p>
            </div>

            <!-- Badge Display -->
            <div v-else class="space-y-4">
              <div class="flex justify-center relative">
                <!-- Image Loading Spinner -->
                <div v-if="showLoader" class="absolute inset-0 flex items-center justify-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red" />
                </div>

                <NuxtImg
                  :key="currentSeason.strBadge"
                  :src="currentSeason.strBadge"
                  :alt="`${league.strLeague} badge`"
                  :class="['max-w-full h-auto max-h-64 object-contain drop-shadow-lg transition-opacity', showLoader ? 'opacity-0' : 'opacity-100']"
                  crossorigin="anonymous"
                  @load="handleImageLoad"
                  @error="handleImageError"
                />
              </div>

              <!-- Season Info -->
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Season:</span>
                  <span class="text-sm font-semibold text-gray-900">{{ currentSeason.strSeason }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Sport:</span>
                  <span class="text-sm font-semibold text-gray-900">{{ league.strSport }}</span>
                </div>
                <div v-if="league.strLeagueAlternate" class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">Alternative Name:</span>
                  <span class="text-sm text-gray-900">{{ league.strLeagueAlternate }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end p-6 border-t">
            <button
              class="px-6 py-2 bg-red text-white rounded-lg hover:bg-red/90 transition-colors font-medium"
              @click="handleClose"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>