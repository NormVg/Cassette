
<script setup>
import { useAppBasicStore } from '~/store/AppBasicState';


const AppBasic = useAppBasicStore()

</script>

<template>
  <div id="tracklist-box">
    <div v-if="AppBasic.currentTracklist.length === 0" id="no-trk">
      No tracks available.
    </div>
<TrackCard  v-for="item in AppBasic.currentTracklist" :key="item" :title="item.name" :idsong="item.id" :artist="item.artist"/>

  </div>
</template>

<style scoped>
#tracklist-box {
 overflow-y: scroll;
 height: 88%;
}

#no-trk{
  /* border:  1px solid green; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
