<script setup>
import { ref } from 'vue';

const userID = ref('');
const ClientId = ref('');
const ClientCred = ref('');


const imageFile = ref(null);

import SyncIcon from "@/assets/sync.png"
import Logout from "@/assets/logout.png"
import { useAppBasicStore } from '~/store/AppBasicState';
import { deleteAllFiles,walkRootDirectory } from '~/utils/myHandlerOPFS';
import { usePopUpStore } from '~/store/PopUpStore';


const AppBasic = useAppBasicStore()
// const ActiveAreaStore = useActiveAreaStore()
const PopState = usePopUpStore()

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};



const isSync = ref(false)

const handleSubmit = async () => {


  // // Perform your form submission logic here
  console.log('Form submitted', {
    // image: imageFile.value,
    userID: userID.value,
    ClientId: ClientId.value,
    ClientCred: ClientCred.value,
  });

  const { data: resp } = await useFetch("/api/mg/update-user", {
    method: "POST",
    body: {
      "username": AppBasic.SessionUsername.trim(),
      "userID": userID.value.trim(),
      "ClientID": ClientId.value.trim(),
      "ClientSecret": ClientCred.value.trim(),
    }
  })


  await FetchUserData()
  await handleSyncBtn()


};


const FetchUserData = async () => {
  const {data:userData} = await useFetch("/api/mg/getuser?username="+AppBasic.SessionUsername)

  userID.value = userData.value[0].box_user_id	;
  ClientId.value = userData.value[0].box_client_id	;
  ClientCred.value = userData.value[0].box_client_secret	;

}

const handleLogOut = () => {
  navigateTo("/logout")
}


const handleSyncBtn = async () => {

  if (isSync.value === false) {
    isSync.value = true
    await useFetch("/api/indexMusic?username=" + AppBasic.SessionUsername)
    await useFetch("/api/indexThumb?username=" + AppBasic.SessionUsername)
    isSync.value = false
    alert("data synced")
  }
}



const deleteCasheData = async () =>{
  PopState.setFullLoader(true)
  console.log(await walkRootDirectory())
  await deleteAllFiles("cassetteMusic")
  await deleteAllFiles("cassetteImage")
  PopState.setFullLoader(false)
  alert("Browser cache has been deleted successfully!");
}


onMounted(async () => {
  await FetchUserData()
})







</script>

<template>
  <div id="settings-box">






    <!-- <div id="imgUpl">
      <label for="imageUpload">

        Upload Wallpaper <img :src="UploadIcon" alt="upload wallpaper">


      </label>
      <input type="file" id="imageUpload" @change="handleImageUpload" />
    </div> -->



    <form @submit.prevent="handleSubmit">


      <div class="input-group">
        <label for="userID">User ID:</label>
        <input type="password" id="userID" v-model="userID" />
      </div>

      <div class="input-group">
        <label for="ClientId">Client ID:</label>
        <input type="password" id="ClientId" v-model="ClientId" />
      </div>

      <div class="input-group">
        <label for="ClientCred">Client Secret:</label>
        <input type="password" id="ClientCred" v-model="ClientCred" />
      </div>

      <button type="submit">Save</button>
    </form>

    <div id="imgUpl" @click="handleSyncBtn">
      <label for="btn">

        Sync Media <img :class="isSync ? 'rotate' : ''" :src="SyncIcon" alt="sync media">


      </label>

    </div>

    <div id="imgUpl" @click="deleteCasheData">
      <label for="btn">

        Delete Browser Cache



      </label>

    </div>

    <div id="imgUpl" @click="handleLogOut">
      <label for="btn">

        LogOut <img :src="Logout" alt="sync media">


      </label>

    </div>

    <h2>Logged in as {{ AppBasic.SessionUsername }}</h2>

  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 2s linear infinite
}

h2{
color: #0A090C;
margin-left: 10px;
/* font-size: 17px; */
}

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
  transition: all ease-in-out 200ms;

}

#imgUpl:hover {
  background-color: #17151b;

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
