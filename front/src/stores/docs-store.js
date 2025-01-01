// docs-store.js
import { defineStore } from 'pinia'
import { useStepStore } from '@/stores/step-store.js'

const generateDocuments = (count) => {
  const categories = ["Histoire", "Culture", "Sciences", "Politique", "Technologie"];
  const documents = [];

  for (let i = 0; i < count; i++) {
    documents.push({
      id: i,
      title: `Document ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      pertinence: Math.floor(Math.random() * 100), // Pertinence aléatoire
    });
  }

  return documents;
};

export const useDocsStore = defineStore('docs', {
  state: () => ({
    documents: []
  }),
  actions: {
    generateDocumentsForStep() {
      const stepStore = useStepStore();
      let count;

      switch (stepStore.currentStep) {
        case 1:
          count = 50;
          break;
        case 2:
          count = 100;
          break;
        case 3:
          count = 150;
          break;
        default:
          count = 200;
      }

      this.documents = generateDocuments(count);
    }
  }
})
