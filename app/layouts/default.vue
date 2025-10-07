<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900">Sports Leagues</h1>
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