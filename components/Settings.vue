<script setup>
import { ref } from "vue";

const userID = ref("");
const ClientId = ref("");
const ClientCred = ref("");

const imageFile = ref(null);
import DeleteIcon from "@/assets/dlt_btn.png";
import LinkIcon from "@/assets/link_btn.png";
import SyncIcon from "@/assets/sync.png";
import Logout from "@/assets/logout.png";
import { useAppBasicStore } from "~/store/AppBasicState";
import { deleteAllFiles, walkRootDirectory } from "~/utils/myHandlerOPFS";
import { usePopUpStore } from "~/store/PopUpStore";

const AppBasic = useAppBasicStore();
// const ActiveAreaStore = useActiveAreaStore()
const PopState = usePopUpStore();

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};

const isSync = ref(false);

const handleSubmit = async () => {
  window.location.href = `/api/box/getAuth`;
  // await FetchUserData();
  // await handleSyncBtn();
};

const FetchUserData = async () => {
  const { data: userData } = await useFetch(
    "/api/mg/getuser?username=" + AppBasic.SessionUsername
  );

  userID.value = userData.value[0].box_user_id;
  ClientId.value = userData.value[0].box_client_id;
  ClientCred.value = userData.value[0].box_client_secret;
};

const handleLogOut = () => {
  PopState.setFullLoader(true);
  navigateTo("/logout");
  PopState.setFullLoader(false);
};

const handleSyncBtn = async () => {
  if (isSync.value === false) {
    isSync.value = true;
    await useFetch("/api/indexMusic?username=" + AppBasic.SessionUsername);
    await useFetch("/api/indexThumb?username=" + AppBasic.SessionUsername);
    isSync.value = false;
    alert("data synced");
  }
};

const deleteCasheData = async () => {
  PopState.setFullLoader(true);
  console.log(await walkRootDirectory());
  await deleteAllFiles("cassetteMusic");
  await deleteAllFiles("cassetteImage");
  PopState.setFullLoader(false);
  alert("Browser cache has been deleted successfully!");
};

onMounted(async () => {
  await FetchUserData();
});
</script>

<template>
  <div id="settings-box">
    <!-- <div id="imgUpl">
      <label for="imageUpload">

        Upload Wallpaper <img :src="UploadIcon" alt="upload wallpaper">


      </label>
      <input type="file" id="imageUpload" @change="handleImageUpload" />
    </div> -->
    <div id="imgUpl" @click="handleSubmit">
      <label for="btn">
        Relink Box Account
        <img :src="LinkIcon" alt="relink media" />
      </label>
    </div>

    <div id="imgUpl" @click="deleteCasheData">
      <label for="btn">
        Delete Browser Cache

        <img :src="DeleteIcon" alt="delete media" />
      </label>
    </div>

    <div id="imgUpl" @click="handleSyncBtn">
      <label for="btn">
        Sync Media
        <img :class="isSync ? 'rotate' : ''" :src="SyncIcon" alt="sync media" />
      </label>
    </div>

    <div id="imgUpl" @click="handleLogOut">
      <label for="btn"> LogOut <img :src="Logout" alt="sync media" /> </label>
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
  animation: rotate 2s linear infinite;
}

h2 {
  color: #0a090c;
  margin-left: 10px;
  /* font-size: 17px; */
}

#imgUpl {
  margin-bottom: 20px;
  /* display: none; */
  background-color: #0a090c;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 95%;
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
  color: #e9dbc7;
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
  color: #0a090c;
}

button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #0a090c;
  color: #e9dbc7;

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
