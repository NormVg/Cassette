<script setup>
import PlayListIcon from "@/assets/playlist_red.png"



const prop = defineProps(
  {
    title: {
      type: String,
      default: "Playlist Title",
    }
  }
);





</script>

<template>
  <div class="playlist-folder-card">

    <div class="playlist-folder-card-thumb">
      <img :src="PlayListIcon" alt="">
    </div>

    <div class="playlist-folder-info">

      <div class="playlist-folder-card-title">
        {{ title }}
      </div>

    </div>

  </div>
</template>

<style scoped>
.playlist-folder-card {
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


.playlist-folder-card:hover {
  background-color: #17151b;

}

.playlist-folder-card:active {
  scale: 0.98;

}

.playlist-folder-card-thumb {
  /* width: 100px; */
  height: 60px;
  border-radius: 10px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

}

.playlist-folder-card-thumb img {
  /* width: 100%; */
  height: 80%;
  /* object-fit: cover; */
}


.playlist-folder-card-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E9DBC7;
}

.playlist-folder-card-artist {
  font-size: 13px;
  color: #989084;
}

.playlist-folder-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
