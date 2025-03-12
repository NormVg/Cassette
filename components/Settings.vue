<script setup>
import { ref } from 'vue';

const userID = ref('');
const ClientId = ref('');
const ClientCred = ref('');
const imageFile = ref(null);

import UploadIcon from "@/assets/upload.png"

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};

const handleSubmit = () => {


  // Perform your form submission logic here
  console.log('Form submitted', {
    image: imageFile.value,
    userID: userID.value,
    ClientId: ClientId.value,
    ClientCred: ClientCred.value,
  });
};
</script>

<template>
  <div id="settings-box">

    <form @submit.prevent="handleSubmit">

      <div id="imgUpl">
        <label for="imageUpload">

          Upload Wallpaper <img :src="UploadIcon" alt="upload wallpaper">


        </label>
        <input type="file" id="imageUpload" @change="handleImageUpload" />
      </div>

      <div class="input-group">
        <label for="userID">User ID:</label>
        <input type="text" id="userID" v-model="userID" />
      </div>

      <div class="input-group">
        <label for="ClientId">Client ID:</label>
        <input type="text" id="ClientId" v-model="ClientId" />
      </div>

      <div class="input-group">
        <label for="ClientCred">Client Credentials:</label>
        <input type="text" id="ClientCred" v-model="ClientCred" />
      </div>

      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<style scoped>
#imgUpl {
  margin-bottom: 20px;
  /* display: none; */
  background-color: #0A090C;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 30%;
  border-radius: 10px;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

}

#imgUpl label {
  height: 100%;
  width: 100%;
  padding: 0px 20px;
  color: #E9DBC7;
  display: flex;
  justify-content: space-between;
  align-items: center;


}



#imgUpl input {
  display: none;
}

#imgUpl img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

#settings-box {
  /* background-color: #7b0c0c; */
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-family: Arial, sans-serif;
}


label {
  color: #0A090C;
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

.input-group input {
  height: 30px;
  border-radius: 10px;
  background-color: #0A090C;
  border: none;
  color: #E9DBC7;
  padding: 5px 20px;
  font-size: 20px;
}

input:focus {
  outline: none;
  /* border: 1px solid #333; */
}

button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #0A090C;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 20%;
}

button:hover {
  background-color: #333;
}
</style>
