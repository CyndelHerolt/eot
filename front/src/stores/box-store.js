import { defineStore } from 'pinia';
import { useDocsStore } from '@/stores/docs-store.js';

export const useBoxStore = defineStore('box', {
    state: () => ({
        boxes: JSON.parse(localStorage.getItem('boxes')) || [],
        defaultProperties: JSON.parse(localStorage.getItem('defaultProperties')) || {}
    }),
    actions: {
        addBox(box) {
            const newBox = { ...box, ...this.defaultProperties };
            this.boxes.push(newBox);
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
        },
        removeBox(box) {
            const docsStore = useDocsStore();
            docsStore.addDocuments(box.documentIds);
            this.boxes = this.boxes.filter(b => b.id !== box.id);
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
        },
        updateBox(box) {
            const index = this.boxes.findIndex(b => b.id === box.id);
            this.boxes[index] = box;
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
        },
        clearBoxes() {
            this.boxes = [];
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
        },
        addPropertyToAllBoxes(propertyName, propertyType, defaultValue) {
            const propertyValue = defaultValue || (propertyType === 'array' ? [] : (propertyType === 'int' ? 0 : ''));
            this.boxes = this.boxes.map(box => {
                box[propertyName] = propertyValue;
                return box;
            });
            this.defaultProperties[propertyName] = propertyValue;
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
            localStorage.setItem('defaultProperties', JSON.stringify(this.defaultProperties));
        },
        removePropertyFromAllBoxes(propertyName) {
            this.boxes = this.boxes.map(box => {
                delete box[propertyName];
                return box;
            });
            delete this.defaultProperties[propertyName];
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
            localStorage.setItem('defaultProperties', JSON.stringify(this.defaultProperties));
        },
        addDocumentsToBox(box, documentIds) {
            const index = this.boxes.findIndex(b => b.id === box.id);
            if (index !== -1) {
                this.boxes[index].documentIds.push(...documentIds);
                localStorage.setItem('boxes', JSON.stringify(this.boxes));
            }
        },
        emptyBox(box) {
            const docsStore = useDocsStore();
            const documentsToReturn = box.documentIds.map(id => {
                return docsStore.documents.find(doc => doc.id === id);
            });
            docsStore.addDocuments(documentsToReturn);
            const index = this.boxes.findIndex(b => b.id === box.id);
            if (index !== -1) {
                this.boxes[index].documentIds = [];
                localStorage.setItem('boxes', JSON.stringify(this.boxes));
            }
        }
    }
});
