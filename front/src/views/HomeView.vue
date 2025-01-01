<script setup>
import DialogBox from "@/components/DialogBox.vue";
import { useStepStore } from '@/stores/step-store.js'
import { useMessagesStore } from '@/stores/messages-store.js'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center gap-4">
    <div v-if="stepStore.isStep1" class="w-full flex justify-center">
      <DialogBox :messages="messagesStore.messages" />
    </div>
    <Button v-if="stepStore.isStep1" @click="stepStore.nextStep">Commencer</Button>
    <Button v-else @click="stepStore.nextStep">Suivant</Button>
  </div>
</template>

<style scoped>
</style>
