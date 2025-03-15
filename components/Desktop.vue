<script setup>
import { FileBase } from 'box-typescript-sdk-gen/lib/schemas/fileBase.generated';
import { useActiveAreaStore } from '~/store/ActiveAreaState';
import { useAppBasicStore } from '~/store/AppBasicState';
import Playlist from './Playlist.vue';
import InputPop from './popup/InputPop.vue';
import PlaylistSelect from './popup/PlaylistSelect.vue';

const ActiveAreaStore = useActiveAreaStore();
const AppBasic = useAppBasicStore()

const isPreload = ref(true)


const postload = async () => {
  const { data: duser } = await authClient.useSession(useFetch)

  const { data: userCheck } = await useFetch("/api/checkuser?username=" + duser.value.user.username)

  console.log("LOGIN AS", duser.value.user.username, userCheck.value)

  AppBasic.SetSessionUsername(duser.value.user.username)


  AppBasic.setIsNewUser(!userCheck.value)

  if (!userCheck.value) {
    alert("Please Fill Box Credintials to Use the app")
    ActiveAreaStore.setCurrentArea("SETTINGS")
  }



}


onMounted(async () => {
  await postload()
  isPreload.value = false

})

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
]);

</script>

<template>
  <div v-if="!isPreload" >

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
    <PlaylistSelect :items="items" title="asd" />



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
