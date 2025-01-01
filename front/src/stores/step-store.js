// step-store.js
import { defineStore } from 'pinia'
import { useMessagesStore } from '@/stores/messages-store.js'

export const useStepStore = defineStore('step', {
  state: () => ({
    currentStep: JSON.parse(localStorage.getItem('currentStep')) || 0
  }),
  actions: {
    nextStep() {
      const messagesStore = useMessagesStore()
      if (this.currentStep === 0) {
        messagesStore.addMessage("Bienvenue, archiviste. Vous venez de rejoindre la prestigieuse Bibliothèque des Échos, le sanctuaire de la mémoire collective. Ici repose l’histoire de l’humanité, fragment par fragment, attendant votre expertise. Soyez vigilant, notre Histoire repose sur votre impartialité.")
      }
      this.currentStep++
      localStorage.setItem('currentStep', JSON.stringify(this.currentStep))
    },
    setStep(step) {
      this.currentStep = step
      localStorage.setItem('currentStep', JSON.stringify(this.currentStep))
    }
  },
  getters: {
    isStep1: (state) => state.currentStep === 1,
    isStep2: (state) => state.currentStep === 2,
    isStep3: (state) => state.currentStep === 3
  }
})
