<script setup>
import DefThumb from "@/assets/def-thumb.png"
import { useActiveAreaStore } from "~/store/ActiveAreaState";
import { useAppBasicStore } from "~/store/AppBasicState";
import add_btn from "@/assets/add_btn.png"
import { usePopUpStore } from "~/store/PopUpStore";

const prop = defineProps(
  {
    title: {
      type: String,
      default: "Song Title",
    },
    artist: {
      type: String,
      default: "Artist",
    },
    idsong: {
      type: String,
      default: "1802275278415"
    },
    currentTrackList: {
      type: Object,

    },
    isPlayList: {
      default: false,
      type: Boolean
    }
  }
);

const PopState = usePopUpStore()
const AppBasic = useAppBasicStore()
const ActiveArea = useActiveAreaStore()

const isDeleted = ref(false)
const thumbnail = ref(DefThumb);



const handleClick = async () => {

  console.log(prop.currentTrackList)
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')



  var mainList = []

  prop.currentTrackList.forEach(element => {
    if (element.type === 'file') {

      mainList.push({
        name: element.name,
        id: element.id,
        artist: prop.artist
      })
    } else if (prop.isPlayList === true) {

      mainList.push({
        name: element.name,
        id: element.songID,
        artist: prop.artist
      })

    }


  });


  console.log(mainList)
  AppBasic.SetCurrentTrackList(mainList)





  console.log(prop.idsong)

  const { data: srcURL } = await useFetch("/api/box/songURL?song_id=" + prop.idsong+"&username="+AppBasic.SessionUsername)

  AppBasic.SetcurrentSong({
    name: prop.title,
    artist: prop.artist,
    src: srcURL.value.src,
    songID: prop.idsong
  })

  ActiveArea.setCurrentArea('TRACKLIST')
}



const getThumbNail = async () => {



  try {
    // console.log("SONG ID",AppBasic.currentSong.songID)
    const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + prop.idsong)

    if (thumb_data.value === false) {
      thumbnail.value = DefThumb

    } else {
      console.log(thumb_data.value)
      thumbnail.value = thumb_data.value

    }


  } catch (error) {
    console.log(error)
    thumbnail.value = DefThumb
  }


}


const handleMenuClick = async (event) => {
  event.stopPropagation(); // Prevent triggering the parent click event
  console.log("Menu clicked for song:", prop.title);

  // alert("add playlist "+prop.title)

  PopState.setTitleAdd2playlistPOP("Select Playlist")
  PopState.setAdd2playlistPOP(true)
  PopState.setSelectedItems([])
  const { data: PlayListNow } = await useFetch("/api/mg/get-playlist?username=" + AppBasic.SessionUsername)
  PopState.setSetlectOptions(PlayListNow.value[0].playlist)
  console.log(PlayListNow.value[0].playlist)


  var OldPlayList = PlayListNow.value[0].playlist

  while (PopState.Add2playlistPOP) {
    await new Promise(resp => setInterval(resp, 100))
  }


  if (PopState.selectedItems.length != 0) {


    PopState.selectedItems.forEach(element => {
      console.log(element.PlayName, element.PlaySongs)

      OldPlayList.forEach(item => {

        if (item.PlayName === element.PlayName) {
          console.log(true, element.PlayName);

          const newSong = {
            name: prop.title,
            songID: prop.idsong
          }
          if (!item.PlaySongs.some(song => song.songID === prop.idsong)) {
            item.PlaySongs = [...item.PlaySongs, newSong];
          } else {
            console.log("Song already exists in the playlist:", element.PlayName);
          }
          // item.PlaySongs = [...item.PlaySongs, newSong];
        }


      });
    });



    const { data: Duser } = await useFetch("/api/mg/update-playlist?username=" + AppBasic.SessionUsername,
      {
        method: "POST",
        body: OldPlayList
      }
    )
    console.log(Duser, "NEW PLAYLIST")


  }

  PopState.setSelectedItems([])

};

const removeSongFromPlaylist = async () => {
  const playlistName = prop.artist
  if (!confirm("Are you sure you want to remove this song from the playlist?")) {
    return;
  }
  try {
    const { data: PlayListNow } = await useFetch("/api/mg/get-playlist?username=" + AppBasic.SessionUsername);
    const playlists = PlayListNow.value[0].playlist;

    const playlist = playlists.find(item => item.PlayName === playlistName);
    if (!playlist) {
      console.log("Playlist not found:", playlistName);
      return;
    }

    const updatedSongs = playlist.PlaySongs.filter(song => song.songID !== prop.idsong);
    playlist.PlaySongs = updatedSongs;

    const { data: updatedPlaylist } = await useFetch("/api/mg/update-playlist?username=" + AppBasic.SessionUsername, {
      method: "POST",
      body: playlists
    });

    console.log("Updated playlist:", updatedPlaylist);

    isDeleted.value = true;


  } catch (error) {
    console.error("Error removing song from playlist:", error);
  }
};


onMounted(async () => {
  getThumbNail()
})


</script>

<template>
  <div  id="song-card-inner" v-if="!isDeleted"  >
    <div class="song-card" @click="handleClick"  >



      <div class="song-card-thumb">
        <img :src="thumbnail" alt="">
      </div>

      <div class="song-info">
        <div class="song-card-artist">
          {{ artist }}
        </div>
        <div class="song-card-title">
          {{ title }}
        </div>

      </div>

    </div>


    <div id="song-menu-box" @click="handleMenuClick">
      <img :src="add_btn" alt="">
    </div>


  </div>
</template>

<style scoped>
#song-menu-box img {
  height: 30px;
}

#song-card-inner {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
  transition: all ease-in-out 200ms;

}

#song-card-inner:hover #song-menu-box {
  opacity: 1;
}

#song-menu-box {
  height: 60px;
  user-select: none;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: all ease-in-out 200ms;
  /* margin: 0%; */
  padding: 0%;
  cursor: pointer;
  font-size: 35px;
  /* border: 1px solid green; */
}

#song-menu-box:hover {
  color: grey;
}

#song-menu-box:active {
  color: #AD2831;
}




.song-card {
  display: flex;
  margin-right: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
  transition: all ease-in-out 200ms;

}

.song-card:hover {
  background-color: #17151b;

}

.song-card:active {
  scale: 0.98;

}

.song-card-thumb {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.song-card-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E9DBC7;
}

.song-card-artist {
  font-size: 13px;
  color: #989084;
}

.song-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
