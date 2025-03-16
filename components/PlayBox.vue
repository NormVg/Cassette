<script setup>
import Play from "@/assets/play.png";
import Pause from "@/assets/pause.png";

import Mix from "@/assets/mix.png";
import MixOff from "@/assets/suffle_off.png"


import BtnNext from "@/assets/btn_next.png";
import BtnPre from "@/assets/btn_pre.png";


import LoopOff from "@/assets/loop_off.png"
import Loop from "@/assets/loop.png";
import AddPlayList from "@/assets/add_btn_blk.png"


import { useAppBasicStore } from "~/store/AppBasicState";
import DefThumb from "@/assets/def-thumb.png"
import { usePopUpStore } from "~/store/PopUpStore";
import MusicLoader from "./icon/MusicLoader.vue";


const isMusicPlaying = ref(false);
const isLoop = ref(false)
const isSuffle = ref(false)
const thumbnail = ref(DefThumb)

const isMusicLoading = ref(false)



const PopState = usePopUpStore()
const AppBasic = useAppBasicStore()





const updateTime = (e) => {
  const audio = e.target;
  const barNow = document.getElementById("bar-now");
  const playNow = document.getElementById("play-now");
  const playFull = document.getElementById("play-full");

  const barWidth = (audio.currentTime / audio.duration) * 100;
  barNow.style.width = barWidth + "%";

  const now = Math.floor(audio.currentTime);
  const minutes = Math.floor(now / 60);
  const seconds = now % 60;
  playNow.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  const full = Math.floor(audio.duration);
  const fullMinutes = Math.floor(full / 60);
  const fullSeconds = full % 60;
  playFull.textContent = `${fullMinutes}:${fullSeconds < 10 ? "0" + fullSeconds : fullSeconds}`;
};


const handleNextSong = async () => {
  const currentIndex = AppBasic.currentTracklist.findIndex(item => item.id === AppBasic.currentSong.songID);
  let nextSong = AppBasic.currentTracklist[currentIndex + 1];

  if (!nextSong) {
    nextSong = AppBasic.currentTracklist[0]; // Loop back to the first song
  }

  const { data: NextSource } = await useFetch(`/api/box/getURL?file_id=${nextSong.id}&username=${AppBasic.SessionUsername}`);

  AppBasic.SetcurrentSong({
    name: nextSong.name,
    src: NextSource.value,
    artist: AppBasic.currentSong.artist,
    songID: nextSong.id,
  });
};

const handlePreviousSong = async () => {
  const currentIndex = AppBasic.currentTracklist.findIndex(item => item.id === AppBasic.currentSong.songID);
  let prevSong = AppBasic.currentTracklist[currentIndex - 1];

  if (!prevSong) {
    prevSong = AppBasic.currentTracklist[AppBasic.currentTracklist.length - 1]; // Loop back to the last song
  }

  const { data: PrevSource } = await useFetch(`/api/box/getURL?file_id=${prevSong.id}&username=${AppBasic.SessionUsername}`);

  AppBasic.SetcurrentSong({
    name: prevSong.name,
    src: PrevSource.value,
    artist: AppBasic.currentSong.artist,
    songID: prevSong.id,
  });
};

const SongEnd = async (e) => {
  console.log("next song");

  if (isLoop.value) {
    const music = document.getElementById("audio");
    music.currentTime = 0;
    music.play();
  } else {

    await handleNextSong()

  }

};


const BarClick = (e) => {
  const barFull = document.getElementById("bar-full");
  const music = document.getElementById("audio");
  music.currentTime = (e.offsetX / barFull.offsetWidth) * music.duration
};

const toggleMusic = () => {

  if (AppBasic.currentSong.src === undefined) {
    alert("choose a music")
    return
  }

  const music = document.getElementById("audio");
  if (isMusicPlaying.value) {
    music.pause();
  } else {
    music.play();
  }
  isMusicPlaying.value = !isMusicPlaying.value;
};


const toggleSuffle = () => {

  isSuffle.value = !isSuffle.value;
};

const toggleLoop = () => {
  // const music = document.getElementById("audio");
  // music.loop = !isLoop.value;
  isLoop.value = !isLoop.value;
};



const handleAddPlaylist = async (event) => {
  event.stopPropagation(); // Prevent triggering the parent click event
  console.log("Menu clicked for song:", AppBasic.currentSong.name);


  PopState.setTitleAdd2playlistPOP("Select Playlist")
  PopState.setAdd2playlistPOP(true)
  PopState.setSelectedItems([])


  const { data: PlayListNow } = await useFetch("/api/mg/get-playlist?username=" + AppBasic.SessionUsername)
  PopState.setSetlectOptions(PlayListNow.value[0].playlist)
  // console.log(PlayListNow.value[0].playlist)


  var OldPlayList = PlayListNow.value[0].playlist

  while (PopState.Add2playlistPOP) {
    await new Promise(resp => setInterval(resp, 100))
  }


  if (PopState.selectedItems.length != 0) {


    PopState.selectedItems.forEach(element => {

      // console.log(element.PlayName, element.PlaySongs)

      OldPlayList.forEach(item => {

        if (item.PlayName === element.PlayName) {
          console.log(true, element.PlayName);

          const newSong = {
            name: AppBasic.currentSong.name,
            songID: AppBasic.currentSong.songID
          }
          if (!item.PlaySongs.some(song => song.songID === AppBasic.currentSong.songID)) {
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



const getThumbNail = async () => {



  try {
    // console.log("SONG ID",AppBasic.currentSong.songID)
    const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + AppBasic.currentSong.songID)

    if (thumb_data.value === false) {
      const { data: resp } = await useFetch(`/api/box/saveThumb?songId=${AppBasic.currentSong.songID}&username=${AppBasic.SessionUsername}`)

      if (resp.value == true) {

        const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + AppBasic.currentSong.songID)
        console.log(thumb_data.value)
        thumbnail.value = thumb_data.value

      } else {
        thumbnail.value = DefThumb
      }

    } else {
      console.log(thumb_data.value)
      thumbnail.value = thumb_data.value

    }


  } catch (error) {
    console.log(error)
    thumbnail.value = DefThumb
  }


}

const srcURL = computed(() => {
  return AppBasic.currentSong.src
})


const onSongChange = async () => {
  isMusicPlaying.value = true
  await getThumbNail()
  const music = document.getElementById("audio");
  music.play()

}

const setMusicLoading = (val) => {
  console.log(val)
  isMusicLoading.value = val
}

onMounted(() => {
  const music = document.getElementById("audio");

  music.addEventListener("waiting", () => {
    console.log("Buffering...");
    setMusicLoading(true)
  });


  music.addEventListener("playing", () => {
    console.log("Music is ready to play.");
    setMusicLoading(false)
  });


  music.addEventListener("loadstart", () => {
    console.log("loaded data stated...");
    setMusicLoading(true)
  });
})

watch(srcURL, onSongChange)

</script>

<template>
  <div id="playbox-box">

    <div id="thumbnail-box">
      <img :src="thumbnail" alt="thumbnail">
    </div>

    <div id="player-box">

      <div id="pb-info">
        <div id="pb-title" :title="AppBasic.currentSong.name">
          <span>

            {{ AppBasic.currentSong.name }}
          </span>
        </div>
        <div id="pb-artist">{{ AppBasic.currentSong.artist }}</div>
      </div>

      <div class="bar" id="bar">
        <div class="play-now" id="play-now">0:00</div>
        <div class="bar-full" id="bar-full" @click="BarClick">
          <div class="bar-now" id="bar-now"></div>
        </div>
        <div class="play-end" id="play-full">0:00</div>
      </div>

      <div id="pb-controls">





        <div id="pb-mix" class="pb-btn" @click="handleAddPlaylist">
          <!-- <img :src="Mix" v-if="isSuffle"  alt="mix">
          <img :src="MixOff" v-else  alt="mix-off"> -->
          <img :src="AddPlayList" alt="mix-off">
        </div>

        <div id="pb-previous" class="pb-btn" @click="handlePreviousSong">
          <img :src="BtnPre" alt="mix-off">
        </div>


        <div id="pb-play-pause" class="pb-btn" v-if="!isMusicLoading">

          <img :src="Play" v-if="!isMusicPlaying" @click="toggleMusic" alt="play">
          <img :src="Pause" v-else @click="toggleMusic" alt="pause">
        </div>

        <div v-else>
          <MusicLoader />
        </div>


        <div id="pb-next" class="pb-btn" @click="handleNextSong">


          <img :src="BtnNext" alt="mix-off">

        </div>

        <div id="pb-loop" class="pb-btn" @click="toggleLoop">
          <img :src="Loop" v-if="isLoop" alt="loop">
          <img :src="LoopOff" v-else alt="loop-off">

        </div>




      </div>

    </div>

    <audio id="audio" ref="audio" :src="AppBasic.currentSong.src" @timeupdate="updateTime" @ended="SongEnd"></audio>
  </div>
</template>

<style scoped>
#audio {
  display: none;
}

#pb-info {
  /* border: 1px solid wheat; */
  width: 70%;
  /* margin-left: 20px; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

}



@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(0);
  }

  /* 80% { transform: translateX(-100%); } */
  100% {
    transform: translateX(-100%);
  }
}

#pb-title {
  padding-top: 10px;
  font-size: 1.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* color: #0A090C; */
  color: #E9DBC7;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

#pb-title span {
  /* animation-delay: 5s; */
  animation: marquee 20s linear infinite;
  display: inline-block;
  transition: transform 0.3s ease;
}



#pb-artist {
  font-size: 1.01rem;
  /* color: #0A090C; */
  color: #E9DBC7;

}

#pb-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 15%;
}

.pb-btn img {
  width: 40px;
  height: 40px;
}

.pb-btn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 50%; */
  /* background-color: #E9DBC7; */
  cursor: pointer;
}

.bar {
  /* border: 1px solid #0A090C; */
  margin-top: 10%;
  width: 90%;
  height: 15px;
  flex-direction: row;
  /* color: #0A090C; */
  color: #E9DBC7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* margin-top: 200px; */

}

.bar-full {
  width: 94%;
  height: 10px;
  background-color: #E9DBC7;
  border-radius: 5px;
  margin-top: 3px;
}

.bar-now {
  height: 100%;
  width: 0%;
  background-color: #0A090C;
  border-radius: 5px;
  transition: all ease-in-out .2s;
}


#player-box {

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}


#playbox-box {
  background-color: #ad28319a;
  background-image: url(@/assets/noise-texture.svg);
  background-size: cover;
  background-repeat: no-repeat;

  width: 25vw;

  height: calc(100vh - 250px);

  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 70px;
  margin-top: 10px;
  flex-direction: column;
  /* margin:  10px auto; */
}

#thumbnail-box {
  width: 70%;
  height: 190px;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 10%;
}

#thumbnail-box img {
  height: 100%;
  width: 100%;
  object-fit: cover;

}
</style>
