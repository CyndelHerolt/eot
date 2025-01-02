<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import {useMessagesStore} from "@/stores/messages-store.js";
const messagesStore = useMessagesStore()

function handleShowDialogBox() {
  messagesStore.showDialogBox()
}

const items = [
  {
    label: 'Messages',
    icon: 'pi pi-envelope',
    command: handleShowDialogBox
  },
  {
    label: 'Algo',
    icon: 'pi pi-microchip-ai',
    command: handleShowDialogBox
  },
  {
    label: 'Actualités',
    icon: 'pi pi-folder-open',
    command: handleShowDialogBox
  },
]

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
  <header class="w-full z-10 backdrop-blur-md">
    <div class="w-full flex justify-between items-center py-2 px-4">
      <nav class="flex gap-2">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <h1 class="text-xl">Echoes Of Truth</h1>
      <SelectButton v-model="isDarkMode" :options="modeOptions" optionLabel="label" optionValue="value" />
    </div>
    <div class="w-full text-xs">
      <Menubar :model="items" />
    </div>
  </header>

  <main class="px-12 w-screen absolute left-0">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - 8rem);
  top: 8rem;
}
</style>
