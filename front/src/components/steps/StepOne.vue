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
    <DialogBox v-if="messagesStore.isVisible && !messagesStore.isRead" :messages="messagesStore.messages" @close="handleClose" />
    <div v-else class="w-full flex justify-between">
      <div class="w-2/3">
        <div>Create box</div>
        <div>Create filter</div>
      </div>
      <div class="w-1/3 px-4 section-2">
        <div class="text-md">
          {{documents.length}} documents à trier
        </div>

        <DataTable :value="documents" showGridlines paginator :rows="10" :rows-per-page-options="[10,20,50,100]">
          <Column field="id" header="Id" sortable></Column>
          <Column field="category" header="Categorie" sortable></Column>
          <Column field="pertinence" header="Pertinence" sortable></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-2 {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
