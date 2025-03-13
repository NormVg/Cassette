<script setup>
import Play from "@/assets/play.png";
import Mix from "@/assets/mix.png";
import Loop from "@/assets/loop.png";
import Pause from "@/assets/pause.png";
import DefMusic from "@/assets/def-music.mp3";
import { useAppBasicStore } from "~/store/AppBasicState";
import DefThumb from "@/assets/def-thumb.png"


const isMusicPlaying = ref(false);

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

const SongEnd = (e) => {
  console.log("next song");
};


const BarClick = (e) => {
  const barFull = document.getElementById("bar-full");
  const music = document.getElementById("audio");
  music.currentTime = (e.offsetX/barFull.offsetWidth)*music.duration
};

const toggleMusic = () => {

  if (AppBasic.currentSong.src === undefined){
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

import axios from "axios";




import { parseBlob } from "music-metadata"; // now hybrid, works in browser


const metadata = ref(null);
const thumbnail = ref(DefThumb);


const getThumbNail = async () => {





  console.log('asd SONG CHANGED')
  const audioUrl = AppBasic.currentSong.src

  const response = await axios.get(audioUrl, { responseType: "arraybuffer" });

  const mimeType = response.headers["content-type"] || "audio/mpeg";
// Create a Blob from the arraybuffer
  const blob = new Blob([response.data], { type: mimeType });

    const metadataResult = await parseBlob(blob);
    metadata.value = metadataResult.common;

    // Extract the first cover art if available
    if (metadataResult.common.picture?.length) {
      const cover = metadataResult.common.picture[0];
      const blob = new Blob([cover.data], { type: cover.format });
      thumbnail.value = URL.createObjectURL(blob);
    } else {
      thumbnail.value = DefThumb;

}}

const srcURL  = computed(()=>{
  return  AppBasic.currentSong.src
})

watch(srcURL,getThumbNail)

</script>

<template>
  <div id="playbox-box">

    <div id="thumbnail-box">
      <img :src="thumbnail" alt="thumbnail">
    </div>

    <div id="player-box">

      <div id="pb-info">
        <div id="pb-title" :title="AppBasic.currentSong.name" >
        <span>

          {{ AppBasic.currentSong.name }}
        </span>
        </div>
        <div id="pb-artist">{{AppBasic.currentSong.artist}}</div>
      </div>

      <div class="bar" id="bar">
        <div class="play-now" id="play-now">0:00</div>
        <div class="bar-full" id="bar-full" @click="BarClick">
          <div class="bar-now" id="bar-now"></div>
        </div>
        <div class="play-end" id="play-full">0:00</div>
      </div>

      <div id="pb-controls">
        <div id="pb-mix" class="pb-btn">
          <img :src="Mix" alt="mix">
        </div>
        <div id="pb-play-pause" class="pb-btn">

          <img :src="Play" v-if="!isMusicPlaying" @click="toggleMusic"  alt="play">
          <img :src="Pause" v-else @click="toggleMusic"  alt="pause">

        </div>


        <div id="pb-loop" class="pb-btn">
          <img :src="Loop" alt="loop">
        </div>

      </div>

    </div>

    <audio id="audio" ref="audio" loop :src="AppBasic.currentSong.src" @timeupdate="updateTime" @ended="SongEnd"></audio>
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

/* #pb-title {
  padding-top: 10px;
  font-size: 1.3rem;
  word-break: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #0A090C;
  width: 50%;
  border: 1px solid green;
  animation: marquee 10s linear infinite;
  display: inline-block;

} */

@keyframes marquee {
  0% { transform: translateX(0); }
  50%{ transform: translateX(0); }
  /* 80% { transform: translateX(-100%); } */
  100% { transform: translateX(-100%); }
}

#pb-title {
  padding-top: 10px;
  font-size: 1.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #0A090C;
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
  color: #0A090C;
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
  color: #0A090C;
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
  background-color: #AD2831;
  background-image: url(@/assets/noise-texture.svg);
  background-size: cover;
  background-repeat: no-repeat;

  width: 25vw;

  height:calc(100vh - 250px);

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
