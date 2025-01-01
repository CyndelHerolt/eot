<script setup>
import DialogBox from "@/components/DialogBox.vue";
import { useMessagesStore } from '@/stores/messages-store.js'
import { useStepStore } from '@/stores/step-store.js'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()

function handleClose() {
  messagesStore.hideDialogBox()
}
</script>

<template>
  <div class="w-full flex justify-center">
    <DialogBox v-if="messagesStore.isVisible" :messages="messagesStore.messages" @close="handleClose" />
    <div v-else>
      <!-- Contenu différent à afficher lorsque la DialogBox est fermée -->
      <p>Contenu de l'étape {{ stepStore.currentStep }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
