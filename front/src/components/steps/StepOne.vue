<script setup>
import DialogBox from "@/components/DialogBox.vue";
import { useMessagesStore } from '@/stores/messages-store.js'
import { useStepStore } from '@/stores/step-store.js'
import { useDocsStore } from '@/stores/docs-store.js'
import { useBoxStore } from '@/stores/box-store.js'
import { computed, onMounted, ref } from 'vue'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()
const docsStore = useDocsStore()
const boxStore = useBoxStore()
const valueChercheurs = ref(0);
const valuePeuple = ref(0);

function handleClose() {
  messagesStore.hideDialogBox()
}

function createBox() {
  const newBox = {
    id: boxStore.boxes.length + 1,
    name: `Box ${boxStore.boxes.length + 1}`,
    documentIds: [],
    // Add any other entries the user wants
  }
  boxStore.addBox(newBox)
}

function deleteBox(box) {
  boxStore.removeBox(box)
}

onMounted(() => {
  if (!localStorage.getItem('documents')) {
    docsStore.generateDocumentsForStep()
  }
  valueChercheurs.value = 50;
  valuePeuple.value = 70;
})

const boxes = computed(() => boxStore.boxes)
const documents = computed(() => docsStore.documents)
</script>

<template>
  <div class="w-full flex justify-center absolute top-0 left-0 h-full px-8">
    <DialogBox v-if="messagesStore.isVisible && !messagesStore.isRead" :messages="messagesStore.messages" @close="handleClose" />
    <div v-else class="w-full flex flex-col justify-between gap-10">
      <div class="h-1/4 flex gap-12">
        <div class="w-2/3 h-full flex flex-col gap-2">
          <Button class="w-fit" icon="pi pi-folder-open" label="Créer une boite" severity="contrast" size="small" @click="createBox"></Button>
          <div class="overflow-y-scroll flex flex-col gap-2">
          <div v-for="box in boxes" :key="box.id" class="border border-surface-500 p-2">
            <InputText v-model="box.name" type="text" size="small" />
            <div>{{box.documentIds.length}} documents</div>
            <div class="flex justify-between">
              <Button class="w-fit" icon="pi pi-plus-circle" label="Ajouter des propriétés" severity="contrast" size="small" @click=""></Button>
              <Button class="w-fit" icon="pi pi-minus-circle" label="Supprimer la boite" severity="danger" size="small" @click="deleteBox(box)"></Button>
            </div>
          </div>
          </div>
        </div>
        <div class="w-1/3 flex flex-col gap-2 bg-surface-500 bg-opacity-5 p-4">
        <div>
          <div>Satisfaction de la communauté des chercheurs</div>
          <ProgressBar :value="valueChercheurs"></ProgressBar>
        </div>
        <div>
          <div>Satisfaction du peuple</div>
          <ProgressBar :value="valuePeuple"></ProgressBar>
        </div>
      </div>
      </div>
      <hr>
      <div class="h-3/4 w-full px-4 overflow-y-scroll">
        <div class="text-md">
          {{documents.length}} documents à trier
        </div>
        <div class="table">
          <DataTable :value="documents" showGridlines paginator :rows="10" :rows-per-page-options="[10,20,50,100]">
            <Column field="id" header="Id" sortable></Column>
            <Column field="category" header="Categorie" sortable></Column>
            <Column field="theme" header="Thème" sortable></Column>
            <Column field="auteur" header="Auteur" sortable></Column>
            <Column field="date" header="Date" sortable></Column>
            <Column field="tags" header="Tags" sortable></Column>
            <Column field="pertinence" header="Pertinence/100" sortable></Column>
            <Column field="status" header="Statut" sortable></Column>
            <Column field="fiabilite" header="Fiabilité/100" sortable></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
