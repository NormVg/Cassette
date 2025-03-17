<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';
import { usePopUpStore } from '~/store/PopUpStore';


const AppBaisc = useAppBasicStore()
const PopUpState = usePopUpStore()
const songList = ref([])

onMounted(async () => {
  // console.log(AppBaisc.SessionUsername)
  PopUpState.setFullLoader(true)
  const { data: List } = await useFetch("/api/mg/songList?username=" + AppBaisc.SessionUsername)
  songList.value = List.value
  PopUpState.setFullLoader(false)

})

</script>

<template>
  <div id="tracklist-box">

    <FileTree :tree="songList" />

  </div>
</template>

<style scoped>
#tracklist-box {
  overflow-y: scroll;
  height: 88%;
}
</style>
