import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePopUpStore = defineStore('pop-up-store', () => {

  const inputPOP = ref(false)
  const TitielInputPOP = ref("")
  const inputResponse = ref("")


  const Add2playlistPOP = ref(false)
  const TitleAdd2playlistPOP = ref('')
  const selectedItems = ref([])
  const selectOptions = ref([])


  const isFullLoader = ref(false)

  function setFullLoader(value) {
    isFullLoader.value = value
  }




  const setSetlectOptions = (items) =>{
    selectOptions.value = items
  }


  function setSelectedItems(items) {
    selectedItems.value = items
  }

  function setInputResponse(response) {
    inputResponse.value = response
  }


  function setTitielInputPOP(value) {
    TitielInputPOP.value = value
  }

  function setTitleAdd2playlistPOP(value) {
    TitleAdd2playlistPOP.value = value
  }



  function setInputPOP(value) {
    inputPOP.value = value
  }

  function setAdd2playlistPOP(value) {
    Add2playlistPOP.value = value
  }

  return {
    setInputPOP, inputPOP,
    Add2playlistPOP, setAdd2playlistPOP,
    setTitielInputPOP, TitielInputPOP,
    setTitleAdd2playlistPOP, TitleAdd2playlistPOP,
    setSelectedItems, selectedItems,
    setInputResponse, inputResponse,
    selectOptions,setSetlectOptions,


    isFullLoader,setFullLoader
  }
})
