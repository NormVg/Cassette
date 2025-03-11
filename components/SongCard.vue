<script setup>
import DefThumb from "@/assets/thumb.png"
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
    img: {
      type: String,
      default: DefThumb,
    }
  }
);
</script>

<template>
  <div class="song-card">

    <div class="song-card-thumb">
      <img :src="img" alt="">
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
</template>

<style scoped>

.song-card{
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

.song-card-thumb{
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-card-thumb img{
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

.song-info{
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

</style>
