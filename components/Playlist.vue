<script setup>

import AddBtn from "@/assets/add_btn.png"
import { useAppBasicStore } from '~/store/AppBasicState';
import { usePopUpStore } from "~/store/PopUpStore";
import backIcon from '@/assets/back_btn.png'


const AppBasic = useAppBasicStore()
const PopState = usePopUpStore()

const currentPlayList = ref([])

const isPlayListOpen = ref(false)
const OpenedPlaylist = ref({})

const loadPlayList = async () => {
  const { data: PlayListNow } = await useFetch("/api/mg/get-playlist?username=" + AppBasic.SessionUsername)
  console.log(PlayListNow.value)
  currentPlayList.value = PlayListNow.value[0].playlist


}



const addPlaylist = async () => {


  const { data: PlayListNow } = await useFetch("/api/mg/get-playlist?username=" + AppBasic.SessionUsername)



  var oldPlayList = PlayListNow.value[0].playlist
  console.log(oldPlayList)

  PopState.setInputResponse("")
  PopState.setTitielInputPOP("Playlist Name.")
  PopState.setInputPOP(true)

  while (PopState.inputPOP) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  if (PopState.inputResponse != "") {


    console.log(PopState.inputResponse)

    const newPlaylist = {
      PlayName: PopState.inputResponse.trim(),
      PlaySong: []
    }

    oldPlayList.push(newPlaylist)

    const { data: Duser } = await useFetch("/api/mg/update-playlist?username=" + AppBasic.SessionUsername,
      {
        method: "POST",
        body: oldPlayList
      }
    )

    console.log(Duser.value)
    currentPlayList.value = Duser.value.playlist


  }

};


const OpenPlaylist = (param)=>{
  console.log(param.PlayName,"opend")
  OpenedPlaylist.value = param
  isPlayListOpen.value =true
}


const goBack = () =>{
  console.log("closed")
  OpenedPlaylist.value = {}
  isPlayListOpen.value =false
}

onMounted(async () => {
  loadPlayList()
})


</script>

<template>
  <div id="tracklist-box">

<div v-if="!isPlayListOpen">


  <div id="add-playlist" @click="addPlaylist">
    Create Playlist <img :src="AddBtn" alt="">
  </div>

  <div v-for="item in currentPlayList" @click="()=>{OpenPlaylist(item)}"  :key="item">
    <PlaylistCard  :title="item.PlayName" />
  </div>

</div>

<div v-else>
  <div class="parent-folder-box">
      <button class="back-button" @click="goBack"><img :src="backIcon" alt=""></button>
        {{ OpenedPlaylist.PlayName }}
          <!-- asdasd -->
      </div>

  <div v-for="item in OpenedPlaylist.PlaySongs" :key="item" >
    <PlaylistSongCard :currentTrackList="OpenedPlaylist.PlaySongs" :isPlayList="true"   :title="item.name" :idsong="item.songID" :artist="OpenedPlaylist.PlayName" />
  </div>


</div>



  </div>
</template>

<style scoped>
.back-button img{
  height:30px;
  /* border: 1px solid green; */
}
.back-button {
  /* margin-bottom: 10px; */
  background: none;
  color: white;
  border: none;
  /* padding: 5px 10px; */
  height: 50px;
  width:50px;
  cursor: pointer;
  /* border: 1px solid green; */

  display: flex;
  justify-content: center;
  align-items: center;
}

.parent-folder-box {
  margin-bottom: 10px;
  /* margin-left: 10px; */
  color: #E9DBC7;
  font-size: 25px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid green; */
}

#tracklist-box {
  overflow-y: scroll;
  height: 88%;
  margin-top: 10px;
}

#add-playlist {
  /* border:  1px solid green; */
  /* border: 1px solid green; */
  background-color: #0A090C;
  height: 60px;
  width: 30%;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #E9DBC7;
  font-size: 20px;
}

#add-playlist img {
  height: 40px;
  margin-left: 10px;
}


#add-playlist:hover {
  background-color: #17151b;

}

#add-playlist:active {
  scale: 0.98;

}
</style>
