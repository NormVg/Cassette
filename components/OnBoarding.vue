<template>
  <div id="settings-box">

    <h2>Cassette - On Boaring </h2>
    <h3>Connect your Box account</h3>

    <button @click="handleSubmit">Connect Box Account</button>

  </div>
</template>

<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';



const AppBasic = useAppBasicStore()

const handleSubmit = async () => {

  window.location.href = `/api/box/getAuth`;

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
  width: 90%;

  font-family: "K2D", sans-serif;
  font-weight: 400;
  font-style: normal;
  transition: all ease-in-out 200ms;
}

button:hover {
  background-color: #17151b;

}

</style>
