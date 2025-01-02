import { defineStore } from 'pinia';
import { useStepStore } from '@/stores/step-store.js';

const generateDocuments = (count) => {
  const categories = ["Histoire", "Culture", "Sciences", "Politique", "Technologie"];
  const themes = ["Révolutions", "Avancées IA", "Conflits mondiaux", "Art numérique", "Climat"];
  const authors = ["Dr. Anna Taylor", "Prof. John Smith", "Archiviste inconnu", "Gouvernement central", "Observatoire des sciences"];
  const statuses = ["Confidentiel", "Public", "Partiellement corrompu", "Obsolète"];
  const tagsPool = ["IA", "Éthique", "Robotique", "Climat", "Démocratie", "Innovation"];

  const documents = [];

  for (let i = 1; i < count; i++) {
    documents.push({
      id: i,
      title: `Document ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      pertinence: Math.floor(Math.random() * 100), // Pertinence aléatoire
      auteur: authors[Math.floor(Math.random() * authors.length)], // Auteur aléatoire
      // Date entre 1920 et 2025 au format DD/MM/YYYY (ex: 01/01/2022)
      date: `${Math.floor(Math.random() * 31).toString().padStart(2, '1')}/${Math.floor(Math.random() * 12).toString().padStart(2, '1')}/${Math.floor(Math.random() * 105) + 1920}`,
      theme: themes[Math.floor(Math.random() * themes.length)], // Thème aléatoire
      // Tags aléatoires sans doublons
      tags: Array.from(new Set(Array.from({ length: Math.floor(Math.random() * tagsPool.length) }, () => tagsPool[Math.floor(Math.random() * tagsPool.length)]))),
      status: statuses[Math.floor(Math.random() * statuses.length)], // Statut aléatoire
      fiabilite: Math.floor(Math.random() * 100) + 1, // Score de fiabilité entre 1 et 100
    });
  }

  return documents;
};

export const useDocsStore = defineStore('docs', {
  state: () => ({
    documents: JSON.parse(localStorage.getItem('documents')) || []
  }),
  actions: {
    generateDocumentsForStep() {
      const stepStore = useStepStore();
      let count;

      switch (stepStore.currentStep) {
        case 1:
          count = 51;
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
    },
    addDocuments(documents) {
      this.documents.push(...documents);
      localStorage.setItem('documents', JSON.stringify(this.documents));
    },
    removeDocuments(documentIds) {
      console.log(documentIds);
      this.documents = this.documents.filter(doc => doc && !documentIds.includes(doc.id));
      localStorage.setItem('documents', JSON.stringify(this.documents));
    }
  }
});
