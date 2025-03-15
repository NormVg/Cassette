<template>
  <div v-if="PopState.Add2playlistPOP" class="popup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">X</button>
      <h2>{{ PopState.TitleAdd2playlistPOP }}</h2>
      <ul>
        <li v-for="(item, index) in PopState.selectOptions" :key="index">
          <label>
            <input type="checkbox" v-model="selectedItems" :value="item" />
            {{ item }}
          </label>
        </li>
      </ul>
      <button @click="submitSelection">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePopUpStore } from "~/store/PopUpStore";

const PopState = usePopUpStore() 


const selectedItems = ref([]);

function openPopup() {
  PopState.setAdd2playlistPOP(true)
}

function closePopup() {
  PopState.setAdd2playlistPOP(false)
}

function submitSelection() {
  console.log("Selected Items:", selectedItems.value);

  PopState.setSelectedItems(selectedItems.value)

  closePopup();
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
