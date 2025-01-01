// messages-store.js
import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: JSON.parse(localStorage.getItem('messages')) || [],
    isVisible: true,
    isRead: JSON.parse(localStorage.getItem('isRead')) || false
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
      localStorage.setItem('messages', JSON.stringify(this.messages))
    },
    hideDialogBox() {
      this.isRead = true
      this.isVisible = false
      localStorage.setItem('isRead', JSON.stringify(this.isRead))
    },
    showDialogBox() {
      this.isRead = false
      this.isVisible = true
      localStorage.setItem('isRead', JSON.stringify(this.isRead))
    },
    markAsRead() {
      this.isRead = true
      localStorage.setItem('isRead', JSON.stringify(this.isRead))
    }
  }
})
