import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActiveAreaStore = defineStore('active-area-store', () => {
  const currentArea  = ref("FOLDER")

  const setCurrentArea = (area) => {
    currentArea.value = area
  }
  return {
    currentArea,
    setCurrentArea
  }
})
