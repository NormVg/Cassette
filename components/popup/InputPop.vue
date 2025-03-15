<template>
  <div v-if="PopState.inputPOP" class="popup-overlay">
    <div class="popup">
      <h2>{{ PopState.TitielInputPOP }}</h2>
      <input v-model="inputValue" type="text" placeholder="Enter text" />
      <div id="btn-box">

        <button @click="close">Close</button>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

import { usePopUpStore } from "~/store/PopUpStore";

const PopState = usePopUpStore()

const inputValue = ref("");


const submit = () => {
  // console.log("Submitted value:", inputValue.value);
  if (inputValue.value === ''){
    return
  }

  PopState.setInputResponse(inputValue.value)
  inputValue.value = ""
  close();
};

const close = () => {
  PopState.setInputPOP(false)
  inputValue.value = ""
};
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
  background: #AD2831;
  padding: 1px 20px;
  border-radius: 10px;
  /* text-align: center; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}




.input-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;


}

 input {
  height: 30px;
  border-radius: 10px;
  background-color: #0A090C;
  border: none;
  color: #E9DBC7;
  padding: 5px 20px;
  font-size: 20px;
  transition: all ease-in-out 200ms;

}


 input:hover {
  background-color: #17151b;

}

input:focus {
  outline: none;
  /* border: 1px solid #333; */
}



#btn-box{
  /* border: 1px solid green; */
  width: 100%;
}

/*
button {
  margin: 10px;
} */
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
