<template>
  <div v-if="PopState.isFullLoader" class="popup-overlay">
    <div class="popup">

      <div class="Homeloader"  ></div>
    </div>
  </div>
</template>


<script setup>


import { usePopUpStore } from "~/store/PopUpStore";

const PopState = usePopUpStore()




</script>

<style scoped>
.popup-overlay {
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

.popup {
  /* background: #AD2831; */
  padding: 1px 20px;
  border-radius: 10px;
  /* text-align: center; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}





</style>
