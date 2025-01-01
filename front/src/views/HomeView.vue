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

function handleShowDialogBox() {
  messagesStore.showDialogBox()
}

const dockItems = [
  {
    label: 'Messages',
    icon: 'pi pi-envelope',
    command: handleShowDialogBox
  },{
    label: 'Messages',
    icon: 'pi pi-microchip-ai',
    command: handleShowDialogBox
  },
]

const onDockItemClick = (event, item) => {
  if (item.command) {
    item.command();
  }
  event.preventDefault();
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center gap-4">
    <Dock :model="dockItems" position="left">
      <template #item="{ item }">
        <a href="#" class="p-dock-item-link" @click="onDockItemClick($event, item)">
          <i :class="item.icon"></i>
        </a>
      </template>
    </Dock>
    <StepOne v-if="stepStore.isStep1" />
    <Button v-else severity="danger" @click="handleNextStep">Commencer</Button>
  </div>
</template>

<style scoped>
.p-dock-item-link:hover {
  cursor: pointer;
}
</style>
