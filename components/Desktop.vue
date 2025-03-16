<script setup>
import { FileBase } from 'box-typescript-sdk-gen/lib/schemas/fileBase.generated';
import { useActiveAreaStore } from '~/store/ActiveAreaState';
import { useAppBasicStore } from '~/store/AppBasicState';
import Playlist from './Playlist.vue';
import InputPop from './popup/InputPop.vue';
import PlaylistSelect from './popup/PlaylistSelect.vue';
import Loader from './popup/loader.vue';

const ActiveAreaStore = useActiveAreaStore();
const AppBasic = useAppBasicStore()

const isPreload = ref(true)


const postload = async () => {
  const { data: duser } = await authClient.useSession(useFetch)

  const { data: userCheck } = await useFetch("/api/checkuser?username=" + duser.value.user.username)

  console.log("LOGIN AS", duser.value.user.username, userCheck.value)

  AppBasic.SetSessionUsername(duser.value.user.username)


  AppBasic.setIsNewUser(!userCheck.value)
  // AppBasic.setIsNewUser(true)


  if (!userCheck.value) {
    alert("Please Fill Box Credintials to Use the app")
    ActiveAreaStore.setCurrentArea("SETTINGS")
  }



}


onMounted(async () => {
  await postload()
  isPreload.value = false

})


</script>

<template>
  <div v-if="!isPreload" >


  <div v-if="AppBasic.isNewUser"  >
    <OnBoarding/>
  </div>
  <span v-else >

    <SideBar />
    <Wallpaper />
    <PlayBox />
    <ActiveArea>
      <TrackList v-if="ActiveAreaStore.currentArea === 'TRACKLIST'" />
      <Settings v-if="ActiveAreaStore.currentArea === 'SETTINGS'" />
      <Playlist v-if="ActiveAreaStore.currentArea === 'PLAYLIST'"   />
      <FileSystem v-if="ActiveAreaStore.currentArea === 'FOLDER'" />
    </ActiveArea>

    <InputPop/>
    <PlaylistSelect  />
    <Loader/>

  </span>



  </div>



  <div class="loading-screen" v-else  >

    <div class="Homeloader"  ></div>
  </div>

</template>

<style scoped>

.loading-screen{
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
