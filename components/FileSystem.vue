
<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';


const AppBaisc = useAppBasicStore()

console.log(AppBaisc.SessionUsername)
const {data:songList} = await useFetch("/api/mg/songList?username="+AppBaisc.SessionUsername)


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
