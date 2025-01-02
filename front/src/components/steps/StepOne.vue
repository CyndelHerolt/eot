<script setup>
import DialogBox from "@/components/DialogBox.vue";
import { useMessagesStore } from '@/stores/messages-store.js'
import { useStepStore } from '@/stores/step-store.js'
import { useDocsStore } from '@/stores/docs-store.js'
import { useBoxStore } from '@/stores/box-store.js'
import { computed, onMounted, ref, watch } from 'vue'

const stepStore = useStepStore()
const messagesStore = useMessagesStore()
const docsStore = useDocsStore()
const boxStore = useBoxStore()
const valueChercheurs = ref(0);
const valuePeuple = ref(0);
const proprieteVisible = ref(false);
const newPropertyName = ref('');
const newPropertyType = ref('text');
const newPropertyDefaultValue = ref('');
const propertyTypes = ['int', 'text', 'array'];
const validationError = ref('');

function validateProperty() {
  if (!newPropertyName.value) {
    validationError.value = 'Property name is required.';
    return false;
  }
  if (newPropertyType.value === 'int' && isNaN(newPropertyDefaultValue.value)) {
    validationError.value = 'Default value must be a number for type int.';
    return false;
  }
  if (newPropertyType.value === 'array' && !Array.isArray(newPropertyDefaultValue.value)) {
    validationError.value = 'Default value must be an array for type array.';
    return false;
  }
  validationError.value = '';
  return true;
}

function addPropertyToBox() {
  if (validateProperty()) {
    boxStore.addPropertyToAllBoxes(newPropertyName.value, newPropertyType.value, newPropertyDefaultValue.value);
    newPropertyName.value = '';
    newPropertyType.value = 'text';
    newPropertyDefaultValue.value = '';
  }
}

function removePropertyFromBox(propertyName) {
  boxStore.removePropertyFromAllBoxes(propertyName);
}

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
const existingProperties = computed(() => {
  const properties = new Set();
  boxStore.boxes.forEach(box => {
    Object.keys(box).forEach(key => {
      if (key !== 'id' && key !== 'name' && key !== 'documentIds') {
        properties.add(key);
      }
    });
  });
  return Array.from(properties);
});

// Watch for changes in the boxes array and update the box in the store
watch(boxes, (newBoxes) => {
  newBoxes.forEach(box => {
    boxStore.updateBox(box);
  });
}, { deep: true });
</script>

<template>
  <div class="w-full flex justify-center absolute top-0 left-0 h-full px-8">
    <DialogBox v-if="messagesStore.isVisible && !messagesStore.isRead" :messages="messagesStore.messages" @close="handleClose" />
    <div v-else class="w-full flex flex-col justify-between gap-6">
      <div class="h-1/2 flex gap-12">
        <div class="w-2/3 h-full flex flex-col gap-2">
          <div class="flex justify-between">
            <Button class="w-fit" icon="pi pi-folder-open" label="Créer une boite" severity="contrast" size="small" @click="createBox"></Button>
            <Button v-if="boxes.length > 0" class="w-fit" icon="pi pi-plus-circle" label="Ajouter des propriétés aux boîtes" severity="contrast" size="small" @click="proprieteVisible = true"></Button>

            <Dialog v-model:visible="proprieteVisible" modal header="Améliorer vos boîtes" :style="{ width: '25rem' }">
              <span class="text-surface-500 dark:text-surface-400 block mb-8">Ajouter des propriétés</span>
              <div class="flex flex-col gap-4">
                <InputText v-model="newPropertyName" placeholder="Nom de la propriété" />
                <SelectButton v-model="newPropertyType" :options="propertyTypes" />
                <InputText v-model="newPropertyDefaultValue" placeholder="Valeur par défaut" />
                <Button label="Ajouter" @click="addPropertyToBox" />
                <span v-if="validationError" class="text-red-500">{{ validationError }}</span>
              </div>
              <div class="mt-4">
                <span class="text-surface-500 dark:text-surface-400 block mb-8">Propriétés existantes</span>
                <div v-for="property in existingProperties" :key="property" class="flex justify-between items-center">
                  <span>{{ property }}</span>
                  <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="removePropertyFromBox(property)" />
                </div>
              </div>
            </Dialog>
          </div>

          <div class="overflow-y-scroll flex flex-col gap-2">
            <div v-for="box in boxes" :key="box.id" class="border border-surface-500 p-2 flex flex-col gap-2">
              <div class="flex justify-between">
                <div class="flex flex-col gap-1">
                  <div v-for="(value, key) in box" :key="key" class="text-xs">
                    <div v-if="key !== 'id' && key !== 'documentIds'">
                      <label>{{ key }}:</label>
                      <template v-if="typeof value === 'number'">
                        <InputNumber v-model="box[key]" type="number" size="small" />
                      </template>
                      <template v-else-if="Array.isArray(value)">
                        <InputText v-model="box[key]" type="array" size="small" />
                      </template>
                      <template v-else>
                        <InputText v-model="box[key]" type="text" size="small" />
                      </template>
                    </div>
                  </div>
                </div>
                <div>
                  <div>{{box.documentIds.length}} documents</div>
                  <Button class="w-fit" icon="pi pi-minus-circle" label="Supprimer la boite" severity="contrast" size="small" @click="deleteBox(box)"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 h-fit flex flex-col gap-2 bg-surface-500 bg-opacity-5 p-4">
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
      <div class="h-1/2 w-full px-4 py-10 overflow-y-scroll">
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
