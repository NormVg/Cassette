<template>
  <div v-if="PopState.Add2playlistPOP" class="popup">
    <div class="popup-content">

      <h2 class="heading" >{{ PopState.TitleAdd2playlistPOP || "hello" }}</h2>

      <ul>
        <li v-for="(item, index) in PopState.selectOptions" :key="index">
          <label>
            <input type="checkbox" v-model="selectedItems" :value="item" />
            <span>

              {{ item.PlayName }}
            </span>
          </label>
        </li>
      </ul>


      <div id="btn-box">
        <button @click="closePopup">Close</button>
        <button @click="submitSelection">Submit</button>
      </div>
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
  selectedItems.value = []
  PopState.setAdd2playlistPOP(false)
}

function submitSelection() {
  console.log("Selected Items:", selectedItems.value);
  PopState.setSelectedItems(selectedItems.value)


  closePopup();
}
</script>

<style scoped>
#btn-box {
  width: 100%;
}

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

.heading{
  font-size: 25px;
  /* border: 1px  springgreen solid; */
  margin: 0px;
  margin-top: 10px
}

.popup-content {
  background: #AD2831;
  padding: 20px;

  width: 300px;

  position: relative;
  padding: 1px 20px;
  border-radius: 10px;
  /* text-align: center; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


ul{
  list-style-type: none;

  width: 99%;
  max-height: 200px;
  overflow-y: auto;
}

li{

  background-color: #0A090C;
  border-radius:10px ;
  padding: 5px;
  margin-bottom: 10px;
  width: 107%;

  margin-left: calc(-12% );

}

label{
  color: #E9DBC7;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}


label span {
  /* color: #0A090C; */
  color: #E9DBC7;

  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  font-size: 20px;
}

input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: #E9DBC7;
  color: #E9DBC7;
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
  --form-control-color: var(--form-control-disabled);

  color: var(--form-control-disabled);
  cursor: not-allowed;
}



button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #0A090C;
  color: #E9DBC7;

  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-left: 10px; */
  margin-right: 10px;
  width: 20%;

  font-family: "K2D", sans-serif;
  font-weight: 400;
  font-style: normal;
  transition: all ease-in-out 200ms;
}

button:hover {
  background-color: #17151b;

}
</style>
