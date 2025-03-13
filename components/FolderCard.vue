<script setup>
import FolderIcon from "@/assets/red_folder.png"



const prop = defineProps(
  {
    title: {
      type: String,
      default: "song-folder Title",
    }
  }
);



</script>

<template>
  <div class="song-folder-card">

    <div class="song-folder-card-thumb">
      <img :src="FolderIcon" alt="">
    </div>

    <div class="song-folder-info">

      <div class="song-folder-card-title">
        {{ title }}
      </div>

    </div>

  </div>
</template>

<style scoped>
.song-folder-card {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
}

.song-folder-card-thumb {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-folder-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.song-folder-card-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E9DBC7;
}

.song-folder-card-artist {
  font-size: 13px;
  color: #989084;
}

.song-folder-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
