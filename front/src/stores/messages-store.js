// store.js
import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: JSON.parse(localStorage.getItem('messages')) || []
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
      localStorage.setItem('messages', JSON.stringify(this.messages))
    },
  }
})
