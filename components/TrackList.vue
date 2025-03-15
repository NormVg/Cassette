
<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';


const AppBasic = useAppBasicStore()

</script>

<template>
  <div id="tracklist-box"   >

<TrackCard  v-for="item in AppBasic.currentTracklist" :key="item" :title="item.name" :idsong="item.id" :artist="item.artist"/>
<!-- <SongCard/>
<SongCard/>
<SongCard/>
<SongCard/>
<SongCard/> -->

  </div>
</template>

<style scoped>
#tracklist-box {
 overflow-y: scroll;
 height: 88%;
}
</style>
