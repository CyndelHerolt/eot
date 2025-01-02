import { defineStore } from 'pinia';

export const useBoxStore = defineStore('box', {
    state: () => ({
        boxes: JSON.parse(localStorage.getItem('boxes')) || []
    }),
    actions: {
        addBox(box) {
            this.boxes.push(box);
            localStorage.setItem('boxes', JSON.stringify(this.boxes));
        },
        removeBox(box) {
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
        }
    }
});
