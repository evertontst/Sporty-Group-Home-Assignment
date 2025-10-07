<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-red shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <NuxtImg src="/images/logo.svg" alt="Logo" class="h-10 w-auto" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-50 border-t">
      <div class="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        <p>Sporty Group Home Assignment</p>
      </div>
    </footer>
  </div>
</template>