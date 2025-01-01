<script setup>
import DialogBox from "@/components/DialogBox.vue";
import { useMessagesStore } from '@/stores/messages-store.js'
import { useStepStore } from '@/stores/step-store.js'
import { useDocsStore } from '@/stores/docs-store.js'
import { computed, onMounted } from 'vue'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()
const docsStore = useDocsStore()

function handleClose() {
  messagesStore.hideDialogBox()
}

onMounted(() => {
  docsStore.generateDocumentsForStep()
})

const documents = computed(() => docsStore.documents)
</script>

<template>
  <div class="w-full flex justify-center">
    <DialogBox v-if="messagesStore.isVisible" :messages="messagesStore.messages" @close="handleClose" />
    <div v-else class="w-full flex justify-between">
      <div class="w-1/2">
        <h1 class="text-2xl">Step 1</h1>
        <p>Here are the documents for this step:</p>
      </div>
      <div class="w-1/2">
        <ul>
          <li v-for="document in documents" :key="document.id">
            {{ document.title }} - {{ document.category }} - Pertinence: {{ document.pertinence }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
