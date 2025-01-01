<script setup>
import { defineProps, defineEmits } from 'vue'
import {useMessagesStore} from "@/stores/messages-store.js";
const messagesStore = useMessagesStore()

function handleIsReadMessage() {
  console.log('Mark as read')
  messagesStore.markAsRead()
}

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="container w-1/2 border border-gray-700 rounded-lg">
    <div class="flex items-center p-3 gap-4 rounded-t-md bg-black">
      <div class="flex items-center">
        <button @click="handleIsReadMessage" class="flex justify-center items-center p-0 mr-2 h-3 w-3 rounded-full bg-red-600"></button>
        <button class="flex justify-center items-center p-0 mr-2 h-3 w-3 rounded-full bg-gray-600"></button>
        <button class="flex justify-center items-center p-0 mr-2 h-3 w-3 rounded-full bg-gray-600"></button>
      </div>
      <p class="text-sm text-white opacity-80">echoes@admin: ~</p>
    </div>
    <div class="bg-black bg-opacity-70 px-2 py-4 text-sm rounded-b-md">
      <div v-for="(message, index) in messages" :key="index" class="flex">
        <span class="ml-2 text-green-400 terminal_user">echoes@admin:</span>
        <span class="ml-2 text-blue-600 terminal_location">~</span>
        <span class="ml-2 text-gray-400 terminal_bling">$</span>
        <span class="ml-2 text-gray-200">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
