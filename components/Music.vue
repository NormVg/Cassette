<script setup>
import DefMusic from "@/assets/def-music.mp3";

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

const nextSong = (e) => {
  console.log("next song");
};

</script>

<template>
  <!-- <audio id="audio" ref="audio" autoplay :src="DefMusic" @timeupdate="updateTime" @ended="nextSong"></audio> -->
</template>

<style scoped>
  #audio {
    display: none;
  }
</style>
