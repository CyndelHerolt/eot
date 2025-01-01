<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const isDarkMode = ref(false)
const modeOptions = [
  { label: 'Light', value: false },
  { label: 'Dark', value: true }
]

function toggleDarkMode(value) {
  isDarkMode.value = value
  document.documentElement.classList.toggle('my-app-dark', isDarkMode.value)
}

watch(isDarkMode, (newValue) => {
  toggleDarkMode(newValue)
})
</script>

<template>
  <header class="absolute top-0 left-0 w-full">
    <div class="w-full flex justify-between items-center shadow-sm p-4">
      <nav class="flex gap-2">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <h1 class="text-xl">Echoes Of Truth</h1>
      <SelectButton v-model="isDarkMode" :options="modeOptions" optionLabel="label" optionValue="value" />
    </div>
  </header>

  <main class="h-screen">
  <RouterView />
  </main>
</template>

<style scoped>
/* Add specific styles for dark mode if necessary */
</style>
