<template>
  <div id="settings-box">

    <h2>Cassette - On Boaring </h2>
    <h3>Put your box Credntials</h3>

    <form @submit.prevent="handleSubmit">


      <div class="input-group">
        <label for="userID">User ID:</label>
        <input type="text" id="userID" v-model="userID" required  />
      </div>

      <div class="input-group">
        <label for="ClientId">Client ID:</label>
        <input type="text" id="ClientId" v-model="ClientId" required  />
      </div>

      <div class="input-group">
        <label for="ClientCred">Client Secret:</label>
        <input type="text" id="ClientCred" v-model="ClientCred" required  />
      </div>

      <button type="submit">Save</button>
    </form>

  </div>
</template>

<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';



const AppBasic = useAppBasicStore()

const handleSubmit = async () => {


// Perform your form submission logic here
console.log('Form submitted', {
  // image: imageFile.value,
  userID: userID.value,
  ClientId: ClientId.value,
  ClientCred: ClientCred.value,
});

const { data: resp } = await useFetch("/api/setupUser", {
  method: "POST",
  body: {
    "username": AppBasic.SessionUsername.trim(),
    "userID": userID.value.trim(),
    "ClientID": ClientId.value.trim(),
    "ClientSecret": ClientCred.value.trim(),
  }
})

if (resp.value) {
  AppBasic.setIsNewUser(false)
  ActiveAreaStore.setCurrentArea("FOLDER")
}



};


</script>

<style scoped>


h2,h3{
  color: #E9DBC7;
}

#settings-box {
  /* background-color: #7b0c0c; */
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  color: #fff;
  font-family: Arial, sans-serif;

  background-color: #AD2831;
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
  transition: all ease-in-out 200ms;

}


.input-group input:hover {
  background-color: #17151b;

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
  color: #E9DBC7;

  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
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
