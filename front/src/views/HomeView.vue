<script setup>
import StepOne from "@/components/steps/StepOne.vue";
import { useStepStore } from '@/stores/step-store.js'
import { useMessagesStore } from '@/stores/messages-store.js'
import Dock from 'primevue/dock'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()

function handleNextStep() {
  stepStore.nextStep()
  messagesStore.showDialogBox()
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center gap-4">
    <StepOne v-if="stepStore.isStep1" />
    <Button v-else severity="danger" @click="handleNextStep">Commencer</Button>
  </div>
</template>

<style scoped>
.p-dock-item-link:hover {
  cursor: pointer;
}

.p-dock {
  position: fixed;
}
</style>
