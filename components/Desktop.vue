<script setup>
import { FileBase } from "box-typescript-sdk-gen/lib/schemas/fileBase.generated";
import { useActiveAreaStore } from "~/store/ActiveAreaState";
import { useAppBasicStore } from "~/store/AppBasicState";
import Playlist from "./Playlist.vue";
import InputPop from "./popup/InputPop.vue";
import PlaylistSelect from "./popup/PlaylistSelect.vue";
import Loader from "./popup/loader.vue";

const ActiveAreaStore = useActiveAreaStore();
const AppBasic = useAppBasicStore();

const isPreload = ref(true);

const checkUserBox = async () => {
  const { data: boxCreds } = await useFetch(
    "/api/box/checkBOX?username=" + AppBasic.SessionUsername
  );

  if (!boxCreds.value) {
    alert("Cannot fetch data from BOX. Credentials are wrong, please check.");
  }
};

const postload = async () => {
  const { data: duser } = await authClient.useSession(useFetch);

  const { data: userCheck } = await useFetch(
    "/api/checkuser?username=" + duser.value.user.username
  );

  // console.log("LOGIN AS", duser.value.user.username, userCheck.value);

  AppBasic.SetSessionUsername(duser.value.user.username);

  AppBasic.setIsNewUser(!userCheck.value);

  if (!userCheck.value) {
    alert("Please Fill Box Credintials to Use the app");
    ActiveAreaStore.setCurrentArea("FOLDER");
  }
};

onMounted(async () => {
  await postload();
  isPreload.value = false;
});
</script>

<template>
  <div v-if="!isPreload">
    <div v-if="AppBasic.isNewUser">
    <!-- <div v-if="true"> -->

      <OnBoarding />
    </div>

    <span v-else>
      <SideBar />
      <Wallpaper />
      <PlayBox />
      <ActiveArea>
        <Transition>
          <TrackList v-if="ActiveAreaStore.currentArea === 'TRACKLIST'" />
        </Transition>

        <Transition>
          <Settings v-if="ActiveAreaStore.currentArea === 'SETTINGS'" />
        </Transition>

        <Transition>
          <Playlist v-if="ActiveAreaStore.currentArea === 'PLAYLIST'" />
        </Transition>

        <Transition>
          <FileSystem v-if="ActiveAreaStore.currentArea === 'FOLDER'" />
        </Transition>
      </ActiveArea>

      <InputPop />
      <PlaylistSelect />
      <Loader />
    </span>
  </div>

  <div class="loading-screen" v-else>
    <div class="Homeloader"></div>
  </div>
</template>

<style scoped>
.loading-screen {
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
